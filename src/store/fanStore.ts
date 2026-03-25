import { create } from "zustand";
import { useBluetoothStore, BLE_CHARACTERISTICS } from "./bluetoothStore";

interface Fan1Settings {
  targetTemp: number;
  tempBelowOffset: number;
  tempAboveOffset: number;
  targetHum: number;
  humBelowOffset: number;
  humAboveOffset: number;
}

interface FanStore extends Fan1Settings {
  fan1Speed: number;
  fan1TempActive: boolean;
  fan1HumActive: boolean;
  fan2Speed: number;

  setFanSpeeds: (fan1: number, fan2: number) => void;
  setFan1Status: (speed: number, tempActive: boolean, humActive: boolean) => void;
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
};

function sendFan1Settings(settings: Fan1Settings) {
  const data = JSON.stringify(settings);
  useBluetoothStore.getState().sendCommand(BLE_CHARACTERISTICS.FAN1_SETTINGS, data);
}

export const useFanStore = create<FanStore>((set, get) => ({
  fan1Speed: 0,
  fan1TempActive: false,
  fan1HumActive: false,
  fan2Speed: 0,
  ...DEFAULT_SETTINGS,

  setFanSpeeds: (fan1, fan2) => set({ fan1Speed: fan1, fan2Speed: fan2 }),

  setFan1Status: (speed, tempActive, humActive) =>
    set({ fan1Speed: speed, fan1TempActive: tempActive, fan1HumActive: humActive }),

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
      });
    } catch (e) {
      console.error("[FanStore] loadFan1Settings Parse-Fehler:", e);
    }
  },
}));
