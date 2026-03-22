import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBluetoothStore, BLE_CHARACTERISTICS } from "./bluetoothStore";

export type LightId = "alle" | "raum" | "fach" | "alfred";

export interface LightState {
  power: boolean;
  color: string;
  brightness: number;
}

type Lights = Record<LightId, LightState>;

const ALL_LIGHT_IDS: LightId[] = ["raum", "fach", "alfred"];

const DEFAULT_LIGHT: LightState = {
  power: false,
  color: "#FFFFFF",
  brightness: 50,
};

interface LightsStore {
  lights: Lights;

  setPower: (id: LightId, value: boolean) => void;
  setAllPower: (value: boolean) => void;
  setColor: (id: LightId, color: string) => void;
  setBrightness: (id: LightId, value: number) => void;
}

export const useLightsStore = create<LightsStore>()(
  persist(
    (set, get) => ({
      lights: {
        alle: { ...DEFAULT_LIGHT },
        raum: { ...DEFAULT_LIGHT },
        fach: { ...DEFAULT_LIGHT },
        alfred: { ...DEFAULT_LIGHT },
      },

      setPower: (id: LightId, value: boolean) => {
        if (id === "alle") {
          get().setAllPower(value);
          return;
        }
        set((state) => ({
          lights: { ...state.lights, [id]: { ...state.lights[id], power: value } },
        }));
        const light = get().lights[id];
        const dimmer = value ? light.brightness : 0;
        useBluetoothStore.getState().sendCommand(BLE_CHARACTERISTICS.LIGHT_BRIGHTNESS, JSON.stringify({ device: id, dimmer }));
      },

      setAllPower: (value: boolean) => {
        set((state) => {
          const updated = { ...state.lights };
          ALL_LIGHT_IDS.forEach((id) => {
            updated[id] = { ...updated[id], power: value };
          });
          updated.alle = { ...updated.alle, power: value };
          return { lights: updated };
        });
        const dimmer = value ? get().lights.alle.brightness : 0;
        useBluetoothStore.getState().sendCommand(BLE_CHARACTERISTICS.LIGHT_BRIGHTNESS, JSON.stringify({ device: "all", dimmer }));
      },

      setColor: (id: LightId, color: string) => {
        const ids = id === "alle" ? ALL_LIGHT_IDS : [id];
        set((state) => {
          const updated = { ...state.lights };
          ids.forEach((i) => {
            updated[i] = { ...updated[i], color };
          });
          updated.alle = { ...updated.alle, color };
          return { lights: updated };
        });
        const device = id === "alle" ? "all" : id;
        const hex = color.replace("#", "").toLowerCase();
        const data = JSON.stringify({ device, color: hex });
        useBluetoothStore.getState().sendCommand(BLE_CHARACTERISTICS.LIGHT_COLOR, data);
      },

      setBrightness: (id: LightId, value: number) => {
        const ids = id === "alle" ? ALL_LIGHT_IDS : [id];
        set((state) => {
          const updated = { ...state.lights };
          ids.forEach((i) => {
            updated[i] = { ...updated[i], brightness: value };
          });
          updated.alle = { ...updated.alle, brightness: value };
          return { lights: updated };
        });
        const device = id === "alle" ? "all" : id;
        const data = JSON.stringify({ device, dimmer: value });
        useBluetoothStore.getState().sendCommand(BLE_CHARACTERISTICS.LIGHT_BRIGHTNESS, data);
      },
    }),
    {
      name: "lights-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
