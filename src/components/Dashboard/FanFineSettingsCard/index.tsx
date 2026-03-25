import { View, Text, TouchableOpacity } from "react-native";
import { useFanStore } from "../../../store/fanStore";
import styles from "./style";

interface OffsetRowProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  unit: string;
}

function OffsetRow({ label, value, onChange, min, max, unit }: OffsetRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={styles.rowControls}>
        <TouchableOpacity
          style={styles.stepBtn}
          onPress={() => onChange(Math.max(min, value - 1))}
        >
          <Text style={styles.stepBtnText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.rowValue}>{value}{unit}</Text>
        <TouchableOpacity
          style={styles.stepBtn}
          onPress={() => onChange(Math.min(max, value + 1))}
        >
          <Text style={styles.stepBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function FanFineSettingsCard() {
  const store = useFanStore();

  const update = (key: string) => (value: number) =>
    store.saveAllFan1Settings({ ...store, [key]: value });

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Lüfter 1 — Feineinstellungen</Text>

      <Text style={styles.sectionLabel}>Temperatur</Text>
      <OffsetRow label="Startet" value={store.tempBelowOffset} onChange={update("tempBelowOffset")} min={1} max={10} unit="°C vor Sollwert" />
      <OffsetRow label="100% bei" value={store.tempAboveOffset} onChange={update("tempAboveOffset")} min={1} max={10} unit="°C über Sollwert" />

      <View style={styles.divider} />

      <Text style={styles.sectionLabel}>Luftfeuchte</Text>
      <OffsetRow label="Startet" value={store.humBelowOffset} onChange={update("humBelowOffset")} min={1} max={20} unit="% vor Sollwert" />
      <OffsetRow label="100% bei" value={store.humAboveOffset} onChange={update("humAboveOffset")} min={1} max={20} unit="% über Sollwert" />
    </View>
  );
}
