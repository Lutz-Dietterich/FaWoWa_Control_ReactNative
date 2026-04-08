import { create } from "zustand";

interface Slave1Store {
  temperature:  number | null;
  humidity:     number | null;
  pressure:     number | null;
  fanSpeed:     number | null;
  online:       boolean;
  lastUpdateMs: number | null;

  setSlave1Sensor: (temp: number, hum: number, press: number) => void;
  setSlave1Status: (fanSpeed: number, online: boolean) => void;
  setOffline:      () => void;
}

export const useSlave1Store = create<Slave1Store>((set) => ({
  temperature:  null,
  humidity:     null,
  pressure:     null,
  fanSpeed:     null,
  online:       false,
  lastUpdateMs: null,

  setSlave1Sensor: (temp, hum, press) =>
    set({ temperature: temp, humidity: hum, pressure: press, online: true, lastUpdateMs: Date.now() }),

  setSlave1Status: (fanSpeed, online) =>
    set({ fanSpeed, online }),

  setOffline: () =>
    set({ online: false }),
}));
