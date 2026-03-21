import { create } from "zustand";
import { useBluetoothStore, BLE_CHARACTERISTICS } from "./bluetoothStore";

interface FanStore {
  fan1Speed: number;
  fan2Speed: number;
  targetTemp: number;
  targetHumidity: number;
  autoMode: boolean;

  // Wird vom bluetoothStore aufgerufen wenn ESP32 Status sendet
  setFanSpeeds: (fan1: number, fan2: number) => void;

  // Setzt Wert + sendet via BLE
  setTargetTemp: (value: number) => void;
  setTargetHumidity: (value: number) => void;
}

export const useFanStore = create<FanStore>((set) => ({
  fan1Speed: 0,
  fan2Speed: 0,
  targetTemp: 25,
  targetHumidity: 60,
  autoMode: true,

  setFanSpeeds: (fan1: number, fan2: number) => {
    set({ fan1Speed: fan1, fan2Speed: fan2 });
  },

  setTargetTemp: (value: number) => {
    set({ targetTemp: value });
    const data = JSON.stringify({ targetTemp: value });
    useBluetoothStore.getState().sendCommand(BLE_CHARACTERISTICS.TARGET_TEMP, data);
  },

  setTargetHumidity: (value: number) => {
    set({ targetHumidity: value });
    const data = JSON.stringify({ targetHumidity: value });
    useBluetoothStore.getState().sendCommand(BLE_CHARACTERISTICS.TARGET_HUMIDITY, data);
  },
}));
