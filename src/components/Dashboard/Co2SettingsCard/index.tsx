import { View, Text, TouchableOpacity } from "react-native";
import { useFanStore } from "../../../store/fanStore";
import { useBluetoothStore } from "../../../store/bluetoothStore";
import { CHAR_SENSOR_CTRL, SERVICE_UUID } from "../../../constants/ble";
import styles from "./style";

interface OffsetRowProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}

function OffsetRow({ label, value, onChange, min, max, step, unit }: OffsetRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={styles.rowControls}>
        <TouchableOpacity
          style={styles.stepBtn}
          onPress={() => onChange(Math.max(min, value - step))}
        >
          <Text style={styles.stepBtnText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.rowValue}>{value}{unit}</Text>
        <TouchableOpacity
          style={styles.stepBtn}
          onPress={() => onChange(Math.min(max, value + step))}
        >
          <Text style={styles.stepBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Co2SettingsCard() {
  const store = useFanStore();
  const sendCommand = useBluetoothStore((s) => s.sendCommand);

  const update = (key: string) => (value: number) =>
    store.saveAllFan1Settings({ ...store, [key]: value });

  const calibrate = () => {
    sendCommand(CHAR_SENSOR_CTRL, JSON.stringify({ cmd: "frc" }));
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>CO₂-Regelung</Text>

      <Text style={styles.sectionLabel}>Sollwert</Text>
      <OffsetRow
        label="Ziel-CO₂"
        value={store.targetCo2}
        onChange={update("targetCo2")}
        min={400} max={2000} step={50}
        unit=" ppm"
      />

      <View style={styles.divider} />

      <Text style={styles.sectionLabel}>Lüfterkurve</Text>
      <OffsetRow
        label="Startet"
        value={store.co2BelowOffset}
        onChange={update("co2BelowOffset")}
        min={0} max={500} step={50}
        unit=" ppm vor Sollwert"
      />
      <OffsetRow
        label="100% bei"
        value={store.co2AboveOffset}
        onChange={update("co2AboveOffset")}
        min={0} max={1000} step={50}
        unit=" ppm über Sollwert"
      />

      <View style={styles.divider} />

      <Text style={styles.sectionLabel}>Allgemein</Text>
      <OffsetRow
        label="Einschalt-Drehzahl"
        value={store.minSpeed}
        onChange={update("minSpeed")}
        min={15} max={50} step={5}
        unit="%"
      />

      <View style={styles.divider} />

      <Text style={styles.sectionLabel}>Heizmodus</Text>
      <OffsetRow
        label="CO₂-Sollwert"
        value={store.heatTargetCo2}
        onChange={store.setHeatTargetCo2}
        min={400} max={100000} step={50}
        unit=" ppm"
      />
      <OffsetRow
        label="Temperatur"
        value={store.heatTargetTemp}
        onChange={store.setHeatTargetTemp}
        min={5} max={50} step={1}
        unit="°C"
      />
      <OffsetRow
        label="Startet"
        value={store.heatCo2BelowOffset}
        onChange={store.setHeatCo2BelowOffset}
        min={0} max={100000} step={50}
        unit=" ppm vor Sollwert"
      />
      <OffsetRow
        label="100% bei"
        value={store.heatCo2AboveOffset}
        onChange={store.setHeatCo2AboveOffset}
        min={0} max={100000} step={50}
        unit=" ppm über Sollwert"
      />
      <OffsetRow
        label="Einschalt-Drehzahl"
        value={store.heatMinSpeed}
        onChange={store.setHeatMinSpeed}
        min={5} max={100} step={5}
        unit="%"
      />

      <View style={styles.divider} />

      <Text style={styles.sectionLabel}>Sensor-Kalibrierung</Text>
      <TouchableOpacity style={styles.calibrateBtn} onPress={calibrate}>
        <Text style={styles.calibrateBtnText}>Sensor auf 700 ppm kalibrieren</Text>
      </TouchableOpacity>
    </View>
  );
}
