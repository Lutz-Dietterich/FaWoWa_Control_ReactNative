import { create } from "zustand";
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

  setFanSpeeds: (fan1: number, fan2: number) => void;
  setFan1Status: (speed: number, tempActive: boolean, humActive: boolean, co2Active: boolean) => void;
  setTargetTemp: (value: number) => void;
  setTargetHum: (value: number) => void;
  saveAllFan1Settings: (settings: Fan1Settings) => void;
  loadFan1Settings: (json: string) => void;
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

function sendFan1Settings(settings: Fan1Settings) {
  const data = JSON.stringify(settings);
  // lazy require bricht den Zirkel-Import: bluetoothStore → fanStore → bluetoothStore
  const { useBluetoothStore } = require("./bluetoothStore");
  useBluetoothStore.getState().sendCommand(CHAR_FAN1_SETTINGS, data);
}

export const useFanStore = create<FanStore>((set, get) => ({
  fan1Speed: 0,
  fan1TempActive: false,
  fan1HumActive: false,
  fan1Co2Active: false,
  fan2Speed: 0,
  ...DEFAULT_SETTINGS,

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
}));
