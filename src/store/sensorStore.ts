import { create } from "zustand";

export interface SensorData {
  temperature: number;
  humidity: number;
  co2: number;
}

interface SensorStore {
  temperature: number | null;
  humidity: number | null;
  co2: number | null;
  lastUpdate: string | null;

  setSensorData: (data: SensorData) => void;
}

export const useSensorStore = create<SensorStore>((set) => ({
  temperature: null,
  humidity: null,
  co2: null,
  lastUpdate: null,

  setSensorData: (data: SensorData) => {
    set({
      temperature: data.temperature,
      humidity: data.humidity,
      co2: data.co2,
      lastUpdate: new Date().toLocaleTimeString("de-DE"),
    });
  },
}));
