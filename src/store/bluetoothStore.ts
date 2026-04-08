import { create } from "zustand";
import { Platform, PermissionsAndroid } from "react-native";
import { BleManager, Device, Subscription, BleError } from "react-native-ble-plx";
import {
  DEVICE_NAME,
  SERVICE_UUID,
  CHAR_SENSOR,
  CHAR_FAN1_SETTINGS,
  CHAR_FAN1_STATUS,
  CHAR_LIGHT_POWER,
  CHAR_LIGHT_COLOR,
  CHAR_LIGHT_BRIGHTNESS,
  CHAR_HISTORY_CTRL,
  CHAR_HISTORY_DATA,
  CHAR_SLAVE1_STATUS,
  CHAR_SLAVE1_SENSOR,
  CHAR_SLAVE1_SETTINGS,
} from "../constants/ble";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSensorStore } from "./sensorStore";
import { useFanStore } from "./fanStore";
import { useHistoryStore, HistoryEntry } from "./historyStore";
import { useSlave1Store } from "./slave1Store";

export type ConnectionState = "disconnected" | "scanning" | "connecting" | "connected";

// BLE Charakteristiken — zentral für andere Stores
export const BLE_CHARACTERISTICS = {
  SENSOR: CHAR_SENSOR,
  FAN1_SETTINGS: CHAR_FAN1_SETTINGS,
  FAN1_STATUS: CHAR_FAN1_STATUS,
  LIGHT_POWER: CHAR_LIGHT_POWER,
  LIGHT_COLOR: CHAR_LIGHT_COLOR,
  LIGHT_BRIGHTNESS: CHAR_LIGHT_BRIGHTNESS,
} as const;

// Singleton — wird einmal erstellt und wiederverwendet
const bleManager = new BleManager();

// Subscriptions außerhalb des Stores damit disconnect() darauf zugreifen kann
let _historySubscription: any = null;
let _slave1SensorSubscription: any = null;
let _slave1StatusSubscription: any = null;

async function requestAndroidPermissions(): Promise<boolean> {
  if (Platform.OS !== "android") return true;

  const permissions: string[] = [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];

  if ((Platform.Version as number) >= 31) {
    permissions.push(
      "android.permission.BLUETOOTH_SCAN",
      "android.permission.BLUETOOTH_CONNECT"
    );
  }

  const results = await PermissionsAndroid.requestMultiple(permissions as any);
  return Object.values(results).every((r) => r === PermissionsAndroid.RESULTS.GRANTED);
}

interface BluetoothStore {
  connectionState: ConnectionState;
  isConnected: boolean;
  device: Device | null;
  subscription: Subscription | null;

  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  sendCommand: (characteristic: string, data: string) => Promise<void>;
}

export const useBluetoothStore = create<BluetoothStore>((set, get) => {

  // ── Post-Connect Setup ───────────────────────────────────────────────────────
  // Wird nach erfolgreicher Verbindung aufgerufen (egal ob Direktverbindung oder Scan)

  async function setupDevice(connected: Device) {
    try {
      await connected.requestMTU(128);
      await connected.discoverAllServicesAndCharacteristics();
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await AsyncStorage.setItem("ble_device_id", connected.id).catch(() => {});
      set({ device: connected, connectionState: "connected", isConnected: true });

      // Fan1 Status live monitoren
      connected.monitorCharacteristicForService(
        SERVICE_UUID,
        CHAR_FAN1_STATUS,
        (err: BleError | null, char: any) => {
          if (err || !char?.value) return;
          try {
            const json = atob(char.value);
            const parsed = JSON.parse(json);
            useFanStore.getState().setFan1Status(
              parsed.speed ?? 0,
              parsed.tempActive ?? false,
              parsed.humActive ?? false,
              parsed.co2Active ?? false
            );
          } catch (e) {
            console.error("[BLE] Fan1Status Parse-Fehler:", e);
          }
        }
      );

      // Fan1 Einstellungen vom ESP lesen
      try {
        const char = await connected.readCharacteristicForService(SERVICE_UUID, CHAR_FAN1_SETTINGS);
        if (char?.value) {
          useFanStore.getState().loadFan1Settings(atob(char.value));
        }
      } catch (e) {
        console.warn("[BLE] Fan1Settings lesen fehlgeschlagen:", e);
      }

      // Slave1 Einstellungen vom ESP lesen
      try {
        const char = await connected.readCharacteristicForService(SERVICE_UUID, CHAR_SLAVE1_SETTINGS);
        if (char?.value) {
          useSlave1Store.getState().loadSlave1Settings(atob(char.value));
        }
      } catch (e) {
        console.warn("[BLE] Slave1Settings lesen fehlgeschlagen:", e);
      }

      // History: Subscription bleibt die gesamte Session aktiv
      const historyChunks: HistoryEntry[] = [];

      _historySubscription = connected.monitorCharacteristicForService(
        SERVICE_UUID,
        CHAR_HISTORY_DATA,
        async (err: BleError | null, char: any) => {
          if (err || !char?.value) return;
          try {
            const json = atob(char.value);
            const parsed = JSON.parse(json);

            if (parsed.done === true) {
              // Letzter Bulk-Chunk → merge + ACK
              const entries: HistoryEntry[] = parsed.d ?? [];
              historyChunks.push(...entries);
              await useHistoryStore.getState().mergeEntries(historyChunks);
              historyChunks.length = 0;
              const b64ack = btoa(JSON.stringify({ cmd: "ack" }));
              await connected
                .writeCharacteristicWithResponseForService(SERVICE_UUID, CHAR_HISTORY_CTRL, b64ack)
                .catch(() => {});
            } else if (Array.isArray(parsed)) {
              // Zwischen-Chunk des Bulk-Transfers
              historyChunks.push(...(parsed as HistoryEntry[]));
            } else if (parsed.ts !== undefined) {
              // Echtzeit-Push: einzelner Eintrag
              if (parsed.ts < 1_000_000_000) {
                parsed.ts = Math.floor(Date.now() / 1000);
              }
              await useHistoryStore.getState().mergeEntries([parsed as HistoryEntry]);
            }
          } catch (e) {
            console.warn("[BLE] History Parse-Fehler:", e);
          }
        }
      );

      // Bulk-Transfer starten
      try {
        const appTs = Math.floor(Date.now() / 1000);
        const b64 = btoa(JSON.stringify({ cmd: "send", ts: appTs }));
        await connected.writeCharacteristicWithResponseForService(SERVICE_UUID, CHAR_HISTORY_CTRL, b64);
      } catch (e) {
        console.warn("[BLE] History start fehlgeschlagen:", e);
      }

      // Sensor-Daten empfangen
      const subscription = connected.monitorCharacteristicForService(
        SERVICE_UUID,
        CHAR_SENSOR,
        (err: BleError | null, char: any) => {
          if (err) return;
          if (!char?.value) return;
          try {
            const json = atob(char.value);
            const parsed = JSON.parse(json);
            useSensorStore.getState().setSensorData(parsed);
          } catch (e) {
            console.error("[BLE] Sensor Parse-Fehler:", e);
          }
        }
      );

      // Slave1 Sensordaten (Temp, Hum, Press)
      _slave1SensorSubscription = connected.monitorCharacteristicForService(
        SERVICE_UUID,
        CHAR_SLAVE1_SENSOR,
        (err: BleError | null, char: any) => {
          if (err || !char?.value) return;
          try {
            const parsed = JSON.parse(atob(char.value));
            useSlave1Store.getState().setSlave1Sensor(
              parsed.temp     ?? 0,
              parsed.humidity ?? 0,
              parsed.pressure ?? 0
            );
          } catch (e) {
            console.error("[BLE] Slave1Sensor Parse-Fehler:", e);
          }
        }
      );

      // Slave1 Status (Lüfterdrehzahl, Online)
      _slave1StatusSubscription = connected.monitorCharacteristicForService(
        SERVICE_UUID,
        CHAR_SLAVE1_STATUS,
        (err: BleError | null, char: any) => {
          if (err || !char?.value) return;
          try {
            const parsed = JSON.parse(atob(char.value));
            useSlave1Store.getState().setSlave1Status(
              parsed.speed  ?? 0,
              parsed.online ?? false
            );
          } catch (e) {
            console.error("[BLE] Slave1Status Parse-Fehler:", e);
          }
        }
      );

      set({ subscription });

      connected.onDisconnected(() => {
        get().subscription?.remove();
        _historySubscription?.remove();
        _historySubscription = null;
        _slave1SensorSubscription?.remove();
        _slave1SensorSubscription = null;
        _slave1StatusSubscription?.remove();
        _slave1StatusSubscription = null;
        set({
          subscription: null,
          device: null,
          connectionState: "disconnected",
          isConnected: false,
        });
        useSensorStore.getState().setSensorData({ temperature: 0, humidity: 0, co2: 0 });
        useSlave1Store.getState().setOffline();
      });
    } catch (e) {
      console.error("[BLE] Verbindungsfehler:", e);
      set({ connectionState: "disconnected" });
    }
  }

  return {
    connectionState: "disconnected",
    isConnected: false,
    device: null,
    subscription: null,

    connect: async () => {
      const state = get().connectionState;
      if (state === "scanning" || state === "connecting") return;

      const hasPermission = await requestAndroidPermissions();
      if (!hasPermission) {
        console.warn("[BLE] Berechtigungen fehlen");
        return;
      }

      // Vorherige Verbindung/Scan sauber beenden
      bleManager.stopDeviceScan();
      get().subscription?.remove();
      await get().device?.cancelConnection()?.catch(() => {});
      set({ subscription: null, device: null, isConnected: false });

      await new Promise((r) => setTimeout(r, 500));

      // ── Direktverbindung über gespeicherte Geräte-ID ─────────────────────────
      const storedId = await AsyncStorage.getItem("ble_device_id").catch(() => null);
      if (storedId) {
        set({ connectionState: "connecting" });
        try {
          console.log("[BLE] Direktverbindung zu", storedId);
          const device = await bleManager.connectToDevice(storedId);
          await setupDevice(device);
          return;
        } catch (e) {
          console.warn("[BLE] Direktverbindung fehlgeschlagen, starte Scan:", e);
          set({ connectionState: "disconnected" });
        }
      }

      // ── Fallback: normaler Scan ───────────────────────────────────────────────
      set({ connectionState: "scanning" });

      bleManager.startDeviceScan(null, null, async (error: BleError | null, device: Device | null) => {
        if (error) {
          console.error("[BLE] Scan-Fehler:", error.message);
          set({ connectionState: "disconnected" });
          return;
        }

        if (device?.name === DEVICE_NAME) {
          bleManager.stopDeviceScan();
          set({ connectionState: "connecting" });
          try {
            const connected = await device.connect();
            await setupDevice(connected);
          } catch (e) {
            console.error("[BLE] Verbindungsfehler:", e);
            set({ connectionState: "disconnected" });
          }
        }
      });
    },

    disconnect: async () => {
      bleManager.stopDeviceScan();
      get().subscription?.remove();
      _historySubscription?.remove();
      _historySubscription = null;
      _slave1SensorSubscription?.remove();
      _slave1SensorSubscription = null;
      _slave1StatusSubscription?.remove();
      _slave1StatusSubscription = null;
      await get().device?.cancelConnection();
      set({
        subscription: null,
        device: null,
        connectionState: "disconnected",
        isConnected: false,
      });
    },

    sendCommand: async (characteristic: string, data: string) => {
      const device = get().device;
      if (!device) {
        console.warn("[BLE] Nicht verbunden — sendCommand ignoriert");
        return;
      }
      try {
        const b64 = btoa(data);
        await device.writeCharacteristicWithResponseForService(SERVICE_UUID, characteristic, b64);
      } catch (e) {
        console.error("[BLE] sendCommand Fehler:", e);
      }
    },
  };
});
