import { create } from "zustand";
import { CHAR_SLAVE1_SETTINGS } from "../constants/ble";

export interface Slave1Settings {
  targetTemp: number;
  tempBelowOffset: number;
  tempAboveOffset: number;
  targetHum: number;
  humBelowOffset: number;
  humAboveOffset: number;
  minSpeed: number;
}

interface Slave1Store extends Slave1Settings {
  temperature:  number | null;
  humidity:     number | null;
  pressure:     number | null;
  fanSpeed:     number | null;
  online:       boolean;
  lastUpdateMs: number | null;

  setSlave1Sensor: (temp: number, hum: number, press: number) => void;
  setSlave1Status: (fanSpeed: number, online: boolean) => void;
  setOffline:      () => void;
  saveAllSlave1Settings: (settings: Slave1Settings) => void;
  loadSlave1Settings:    (json: string) => void;
}

const DEFAULT_SETTINGS: Slave1Settings = {
  targetTemp:      22,
  tempBelowOffset: 3,
  tempAboveOffset: 2,
  targetHum:       60,
  humBelowOffset:  5,
  humAboveOffset:  5,
  minSpeed:        20,
};

function sendSlave1Settings(settings: Slave1Settings) {
  const data = JSON.stringify(settings);
  const { useBluetoothStore } = require("./bluetoothStore");
  useBluetoothStore.getState().sendCommand(CHAR_SLAVE1_SETTINGS, data);
}

export const useSlave1Store = create<Slave1Store>((set) => ({
  temperature:  null,
  humidity:     null,
  pressure:     null,
  fanSpeed:     null,
  online:       false,
  lastUpdateMs: null,
  ...DEFAULT_SETTINGS,

  setSlave1Sensor: (temp, hum, press) =>
    set({ temperature: temp, humidity: hum, pressure: press, online: true, lastUpdateMs: Date.now() }),

  setSlave1Status: (fanSpeed, online) =>
    set({ fanSpeed, online }),

  setOffline: () =>
    set({ online: false }),

  saveAllSlave1Settings: (settings) => {
    set(settings);
    sendSlave1Settings(settings);
  },

  loadSlave1Settings: (json) => {
    try {
      const parsed: Partial<Slave1Settings> = JSON.parse(json);
      set({
        targetTemp:      parsed.targetTemp      ?? DEFAULT_SETTINGS.targetTemp,
        tempBelowOffset: parsed.tempBelowOffset ?? DEFAULT_SETTINGS.tempBelowOffset,
        tempAboveOffset: parsed.tempAboveOffset ?? DEFAULT_SETTINGS.tempAboveOffset,
        targetHum:       parsed.targetHum       ?? DEFAULT_SETTINGS.targetHum,
        humBelowOffset:  parsed.humBelowOffset  ?? DEFAULT_SETTINGS.humBelowOffset,
        humAboveOffset:  parsed.humAboveOffset  ?? DEFAULT_SETTINGS.humAboveOffset,
        minSpeed:        parsed.minSpeed        ?? DEFAULT_SETTINGS.minSpeed,
      });
    } catch (e) {
      console.error("[Slave1Store] loadSlave1Settings Parse-Fehler:", e);
    }
  },
}));
