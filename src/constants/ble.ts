// BLE Gerätename des ESP32
export const DEVICE_NAME = "FaWoWa";

// Service UUID
export const SERVICE_UUID = "fa000001-0000-1000-8000-00805f9b34fb";

// Charakteristiken
export const CHAR_SENSOR           = "fa000002-0000-1000-8000-00805f9b34fb";
export const CHAR_FAN1_SETTINGS    = "fa000003-0000-1000-8000-00805f9b34fb";  // Read | Write
export const CHAR_FAN2_SETTINGS    = "fa000004-0000-1000-8000-00805f9b34fb";  // Read | Write
export const CHAR_FAN1_STATUS      = "fa000005-0000-1000-8000-00805f9b34fb";  // Read | Notify
export const CHAR_LIGHT_POWER      = "fa000006-0000-1000-8000-00805f9b34fb";
export const CHAR_LIGHT_COLOR      = "fa000007-0000-1000-8000-00805f9b34fb";
export const CHAR_LIGHT_BRIGHTNESS = "fa000008-0000-1000-8000-00805f9b34fb";
export const CHAR_FAN2_STATUS      = "fa000009-0000-1000-8000-00805f9b34fb";  // Read | Notify
