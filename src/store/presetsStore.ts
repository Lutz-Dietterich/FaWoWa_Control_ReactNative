import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLightsStore } from "./lightsStore";

export interface LightPreset {
  color: string;
  brightness: number;
}

export interface Preset {
  id: string;
  name: string;
  lights: {
    raum: LightPreset;
    fach: LightPreset;
    alfred: LightPreset;
  };
}

const DEFAULT_LIGHT_PRESET: LightPreset = { color: "#FFFFFF", brightness: 50 };

interface PresetsStore {
  presets: Preset[];
  addPreset: (preset: Omit<Preset, "id">) => void;
  updatePreset: (id: string, preset: Omit<Preset, "id">) => void;
  deletePreset: (id: string) => void;
  applyPreset: (id: string) => void;
}

export const usePresetsStore = create<PresetsStore>()(
  persist(
    (set, get) => ({
      presets: [],

      addPreset: (preset) => {
        const newPreset: Preset = { ...preset, id: Date.now().toString() };
        set((state) => ({ presets: [...state.presets, newPreset] }));
      },

      updatePreset: (id, preset) => {
        set((state) => ({
          presets: state.presets.map((p) => (p.id === id ? { ...preset, id } : p)),
        }));
      },

      deletePreset: (id) => {
        set((state) => ({ presets: state.presets.filter((p) => p.id !== id) }));
      },

      applyPreset: (id) => {
        const preset = get().presets.find((p) => p.id === id);
        if (!preset) return;
        const { setColor, setBrightness } = useLightsStore.getState();
        (["raum", "fach", "alfred"] as const).forEach((lightId) => {
          setColor(lightId, preset.lights[lightId].color);
          setBrightness(lightId, preset.lights[lightId].brightness);
        });
      },
    }),
    {
      name: "presets-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
