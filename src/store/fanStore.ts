import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CHAR_FAN1_SETTINGS } from "../constants/ble";

interface Fan1Settings {
  targetTemp: number;
  tempBelowOffset: number;
  tempAboveOffset: number;
  targetHum: number;
  humBelowOffset: number;
  humAboveOffset: number;
  targetCo2: number;
  co2BelowOffset: number;
  co2AboveOffset: number;
  minSpeed: number;
}

interface FanStore extends Fan1Settings {
  fan1Speed: number;
  fan1TempActive: boolean;
  fan1HumActive: boolean;
  fan1Co2Active: boolean;
  fan2Speed: number;
  autoMode: boolean;
  heatModeActive: boolean;
  heatModeEndTime: number | null;

  // Heizmodus-Sollwerte (persistiert)
  heatTargetCo2: number;
  heatTargetTemp: number;
  heatCo2BelowOffset: number;
  heatCo2AboveOffset: number;
  heatMinSpeed: number;
  heatModeDuration: number;

  setFanSpeeds: (fan1: number, fan2: number) => void;
  setFan1Status: (speed: number, tempActive: boolean, humActive: boolean, co2Active: boolean) => void;
  setTargetTemp: (value: number) => void;
  setTargetHum: (value: number) => void;
  saveAllFan1Settings: (settings: Fan1Settings) => void;
  loadFan1Settings: (json: string) => void;
  activateHeatMode: () => void;
  deactivateHeatMode: () => void;
  setHeatTargetCo2: (value: number) => void;
  setHeatTargetTemp: (value: number) => void;
  setHeatCo2BelowOffset: (value: number) => void;
  setHeatCo2AboveOffset: (value: number) => void;
  setHeatMinSpeed: (value: number) => void;
  setHeatModeDuration: (value: number) => void;
}

const DEFAULT_SETTINGS: Fan1Settings = {
  targetTemp: 22,
  tempBelowOffset: 3,
  tempAboveOffset: 2,
  targetHum: 60,
  humBelowOffset: 5,
  humAboveOffset: 5,
  targetCo2: 1000,
  co2BelowOffset: 200,
  co2AboveOffset: 500,
  minSpeed: 20,
};

const DEFAULT_HEAT_SETTINGS = {
  heatTargetCo2: 1800,
  heatTargetTemp: 30,
  heatCo2BelowOffset: 600,
  heatCo2AboveOffset: 1500,
  heatMinSpeed: 15,
  heatModeDuration: 15,
};


let _heatModeBackup: Fan1Settings | null = null;
let _heatModeTimer: ReturnType<typeof setTimeout> | null = null;

function sendFan1Settings(settings: Fan1Settings) {
  const data = JSON.stringify(settings);
  // lazy require bricht den Zirkel-Import: bluetoothStore → fanStore → bluetoothStore
  const { useBluetoothStore } = require("./bluetoothStore");
  useBluetoothStore.getState().sendCommand(CHAR_FAN1_SETTINGS, data);
}

export const useFanStore = create<FanStore>()(
  persist(
    (set, get) => ({
      fan1Speed: 0,
      fan1TempActive: false,
      fan1HumActive: false,
      fan1Co2Active: false,
      fan2Speed: 0,
      autoMode: true,
      heatModeActive: false,
      heatModeEndTime: null,
      ...DEFAULT_SETTINGS,
      ...DEFAULT_HEAT_SETTINGS,

      setFanSpeeds: (fan1, fan2) => set({ fan1Speed: fan1, fan2Speed: fan2 }),

      setFan1Status: (speed, tempActive, humActive, co2Active) =>
        set({ fan1Speed: speed, fan1TempActive: tempActive, fan1HumActive: humActive, fan1Co2Active: co2Active }),

      setTargetTemp: (value) => {
        set({ targetTemp: value });
        sendFan1Settings({ ...get(), targetTemp: value });
      },

      setTargetHum: (value) => {
        set({ targetHum: value });
        sendFan1Settings({ ...get(), targetHum: value });
      },

      saveAllFan1Settings: (settings) => {
        set(settings);
        sendFan1Settings(settings);
      },

      activateHeatMode: () => {
        const current = get();
        _heatModeBackup = {
          targetTemp:      current.targetTemp,
          tempBelowOffset: current.tempBelowOffset,
          tempAboveOffset: current.tempAboveOffset,
          targetHum:       current.targetHum,
          humBelowOffset:  current.humBelowOffset,
          humAboveOffset:  current.humAboveOffset,
          targetCo2:       current.targetCo2,
          co2BelowOffset:  current.co2BelowOffset,
          co2AboveOffset:  current.co2AboveOffset,
          minSpeed:        current.minSpeed,
        };
        const heatSettings: Fan1Settings = {
          ..._heatModeBackup,
          targetTemp:      current.heatTargetTemp,
          targetCo2:       current.heatTargetCo2,
          co2BelowOffset:  current.heatCo2BelowOffset,
          co2AboveOffset:  current.heatCo2AboveOffset,
          minSpeed:        current.heatMinSpeed,
        };
        const endTime = Date.now() + current.heatModeDuration * 60 * 1000;
        set({ ...heatSettings, heatModeActive: true, heatModeEndTime: endTime });
        sendFan1Settings(heatSettings);
        if (_heatModeTimer) clearTimeout(_heatModeTimer);
        _heatModeTimer = setTimeout(() => {
          useFanStore.getState().deactivateHeatMode();
        }, current.heatModeDuration * 60 * 1000);
      },

      deactivateHeatMode: () => {
        if (_heatModeTimer) { clearTimeout(_heatModeTimer); _heatModeTimer = null; }
        if (_heatModeBackup) {
          set({ ..._heatModeBackup, heatModeActive: false, heatModeEndTime: null });
          sendFan1Settings(_heatModeBackup);
          _heatModeBackup = null;
        } else {
          set({ heatModeActive: false, heatModeEndTime: null });
        }
      },

      setHeatTargetCo2:      (value) => set({ heatTargetCo2: value }),
      setHeatTargetTemp:     (value) => set({ heatTargetTemp: value }),
      setHeatCo2BelowOffset: (value) => set({ heatCo2BelowOffset: value }),
      setHeatCo2AboveOffset: (value) => set({ heatCo2AboveOffset: value }),
      setHeatMinSpeed:       (value) => set({ heatMinSpeed: value }),
      setHeatModeDuration:   (value) => set({ heatModeDuration: value }),

      loadFan1Settings: (json) => {
        try {
          const parsed: Partial<Fan1Settings> = JSON.parse(json);
          set({
            targetTemp:      parsed.targetTemp      ?? DEFAULT_SETTINGS.targetTemp,
            tempBelowOffset: parsed.tempBelowOffset ?? DEFAULT_SETTINGS.tempBelowOffset,
            tempAboveOffset: parsed.tempAboveOffset ?? DEFAULT_SETTINGS.tempAboveOffset,
            targetHum:       parsed.targetHum       ?? DEFAULT_SETTINGS.targetHum,
            humBelowOffset:  parsed.humBelowOffset  ?? DEFAULT_SETTINGS.humBelowOffset,
            humAboveOffset:  parsed.humAboveOffset  ?? DEFAULT_SETTINGS.humAboveOffset,
            targetCo2:       parsed.targetCo2       ?? DEFAULT_SETTINGS.targetCo2,
            co2BelowOffset:  parsed.co2BelowOffset  ?? DEFAULT_SETTINGS.co2BelowOffset,
            co2AboveOffset:  parsed.co2AboveOffset  ?? DEFAULT_SETTINGS.co2AboveOffset,
            minSpeed:        parsed.minSpeed        ?? DEFAULT_SETTINGS.minSpeed,
          });
        } catch (e) {
          console.error("[FanStore] loadFan1Settings Parse-Fehler:", e);
        }
      },
    }),
    {
      name: "heat-mode-settings",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        heatTargetCo2:       state.heatTargetCo2,
        heatTargetTemp:      state.heatTargetTemp,
        heatCo2BelowOffset:  state.heatCo2BelowOffset,
        heatCo2AboveOffset:  state.heatCo2AboveOffset,
        heatMinSpeed:        state.heatMinSpeed,
        heatModeDuration:    state.heatModeDuration,
      }),
    }
  )
);
