import { View, Text } from "react-native";
import { useFanStore } from "../../../store/fanStore";
import { useSensorStore } from "../../../store/sensorStore";
import styles from "./style";

export default function FanStatusCard() {
  const fan1Speed     = useFanStore((s) => s.fan1Speed);
  const tempActive    = useFanStore((s) => s.fan1TempActive);
  const humActive     = useFanStore((s) => s.fan1HumActive);
  const co2Active     = useFanStore((s) => s.fan1Co2Active);
  const temperature   = useSensorStore((s) => s.temperature);
  const humidity      = useSensorStore((s) => s.humidity);
  const co2           = useSensorStore((s) => s.co2);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Lüfter 1 — Betrieb</Text>

      <View style={styles.speedRow}>
        <Text style={styles.speedValue}>{fan1Speed}%</Text>
        <Text style={styles.speedLabel}>Lüftergeschwindigkeit</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.modeRow}>
        <View style={styles.modeItem}>
          <View style={[styles.modeDot, tempActive ? styles.dotActive : styles.dotInactive]} />
          <Text style={styles.modeLabel}>Temperaturregelung</Text>
        </View>
        <View style={styles.modeItem}>
          <View style={[styles.modeDot, humActive ? styles.dotActive : styles.dotInactive]} />
          <Text style={styles.modeLabel}>Feuchtigkeitsregelung</Text>
        </View>
        <View style={styles.modeItem}>
          <View style={[styles.modeDot, co2Active ? styles.dotActive : styles.dotInactive]} />
          <Text style={styles.modeLabel}>CO₂-Regelung</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.sensorRow}>
        <View style={styles.sensorItem}>
          <Text style={styles.sensorValue}>{temperature?.toFixed(1) ?? "—"}°C</Text>
          <Text style={styles.sensorLabel}>Temperatur</Text>
        </View>
        <View style={styles.sensorItem}>
          <Text style={styles.sensorValue}>{humidity?.toFixed(1) ?? "—"}%</Text>
          <Text style={styles.sensorLabel}>Luftfeuchte</Text>
        </View>
        <View style={styles.sensorItem}>
          <Text style={styles.sensorValue}>{co2 ?? "—"}</Text>
          <Text style={styles.sensorLabel}>CO₂ ppm</Text>
        </View>
      </View>
    </View>
  );
}
