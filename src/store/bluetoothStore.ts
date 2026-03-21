import { create } from "zustand";
import { Platform, PermissionsAndroid } from "react-native";
import { BleManager, Device, Subscription, BleError } from "react-native-ble-plx";
import {
  DEVICE_NAME,
  SERVICE_UUID,
  CHAR_SENSOR,
  CHAR_TARGET_TEMP,
  CHAR_TARGET_HUMIDITY,
  CHAR_FAN_STATUS,
  CHAR_LIGHT_POWER,
  CHAR_LIGHT_COLOR,
  CHAR_LIGHT_BRIGHTNESS,
} from "../constants/ble";
import { useSensorStore } from "./sensorStore";
import { useFanStore } from "./fanStore";

export type ConnectionState = "disconnected" | "scanning" | "connecting" | "connected";

// BLE Charakteristiken — zentral für andere Stores
export const BLE_CHARACTERISTICS = {
  SENSOR: CHAR_SENSOR,
  TARGET_TEMP: CHAR_TARGET_TEMP,
  TARGET_HUMIDITY: CHAR_TARGET_HUMIDITY,
  FAN_STATUS: CHAR_FAN_STATUS,
  LIGHT_POWER: CHAR_LIGHT_POWER,
  LIGHT_COLOR: CHAR_LIGHT_COLOR,
  LIGHT_BRIGHTNESS: CHAR_LIGHT_BRIGHTNESS,
} as const;

// Singleton — wird einmal erstellt und wiederverwendet
const bleManager = new BleManager();

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

export const useBluetoothStore = create<BluetoothStore>((set, get) => ({
  connectionState: "disconnected",
  isConnected: false,
  device: null,
  subscription: null,

  connect: async () => {
    const hasPermission = await requestAndroidPermissions();
    if (!hasPermission) {
      console.warn("[BLE] Berechtigungen fehlen");
      return;
    }

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
          await connected.requestMTU(128);
          await connected.discoverAllServicesAndCharacteristics();
          await new Promise((resolve) => setTimeout(resolve, 300));

          set({ device: connected, connectionState: "connected", isConnected: true });

          // Sensor-Daten empfangen
          const subscription = connected.monitorCharacteristicForService(
            SERVICE_UUID,
            CHAR_SENSOR,
            (err: BleError | null, char: any) => {
              if (err) {
                console.error("[BLE] Sensor Fehler:", err.message);
                return;
              }
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

          set({ subscription });

          connected.onDisconnected(() => {
            get().subscription?.remove();
            set({
              subscription: null,
              device: null,
              connectionState: "disconnected",
              isConnected: false,
            });
            useSensorStore.getState().setSensorData({ temperature: 0, humidity: 0, co2: 0 });
          });
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
}));
