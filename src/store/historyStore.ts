import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "fawowa_history_v1";

export interface HistoryEntry {
  ts: number;       // Unix-Timestamp (Sekunden)
  t: number;        // Temperatur °C
  h: number;        // Luftfeuchte %
  c: number;        // CO₂ ppm
  s: number;        // Lüfterdrehzahl 0–100 %
  ta: 0 | 1;        // tempActive
  ha: 0 | 1;        // humActive
}

interface HistoryStore {
  entries: HistoryEntry[];

  // Neue Einträge vom ESP mergen (Duplikate per ts deduplizieren)
  mergeEntries: (incoming: HistoryEntry[]) => Promise<void>;

  // Gespeicherte Daten beim App-Start laden
  loadFromStorage: () => Promise<void>;

  // Einträge älter als 48h entfernen
  pruneOld: () => Promise<void>;
}

export const useHistoryStore = create<HistoryStore>((set, get) => ({
  entries: [],

  loadFromStorage: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: HistoryEntry[] = JSON.parse(raw);
        set({ entries: parsed });
      }
    } catch (e) {
      console.warn("[HistoryStore] Laden fehlgeschlagen:", e);
    }
  },

  mergeEntries: async (incoming: HistoryEntry[]) => {
    const existing = get().entries;
    const tsSet = new Set(existing.map((e) => e.ts));

    const newEntries = incoming.filter((e) => !tsSet.has(e.ts));
    if (newEntries.length === 0) return;

    const merged = [...existing, ...newEntries].sort((a, b) => a.ts - b.ts);

    // Nur die letzten 48h behalten
    const cutoff = Date.now() / 1000 - 48 * 3600;
    const pruned = merged.filter((e) => e.ts >= cutoff);

    set({ entries: pruned });
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pruned));
    } catch (e) {
      console.warn("[HistoryStore] Speichern fehlgeschlagen:", e);
    }
  },

  pruneOld: async () => {
    const cutoff = Date.now() / 1000 - 48 * 3600;
    const pruned = get().entries.filter((e) => e.ts >= cutoff);
    set({ entries: pruned });
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pruned));
    } catch (e) {
      console.warn("[HistoryStore] Pruning fehlgeschlagen:", e);
    }
  },
}));
