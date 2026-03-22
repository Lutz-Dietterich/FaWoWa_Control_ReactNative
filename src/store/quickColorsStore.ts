import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEFAULT_COLORS = [
  "#FF0000",
  "#FF8800",
  "#FFFF00",
  "#00FF00",
  "#00FFFF",
  "#0000FF",
  "#FF00FF",
  "#FFFFFF",
];

interface QuickColorsStore {
  colors: string[];
  addColor: (color: string) => void;
  removeColor: (color: string) => void;
  replaceColor: (oldColor: string, newColor: string) => void;
}

export const useQuickColorsStore = create<QuickColorsStore>()(
  persist(
    (set) => ({
      colors: DEFAULT_COLORS,
      addColor: (color) =>
        set((state) => ({ colors: [...state.colors, color] })),
      removeColor: (color) =>
        set((state) => ({ colors: state.colors.filter((c) => c !== color) })),
      replaceColor: (oldColor, newColor) =>
        set((state) => ({ colors: state.colors.map((c) => (c === oldColor ? newColor : c)) })),
    }),
    {
      name: "quick-colors-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
