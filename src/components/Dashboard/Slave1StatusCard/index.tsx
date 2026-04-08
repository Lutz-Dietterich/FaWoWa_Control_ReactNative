import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useSlave1Store } from "../../../store/slave1Store";
import styles from "./style";

const STALE_THRESHOLD_MS = 30000;

export default function Slave1StatusCard() {
  const temperature  = useSlave1Store((s) => s.temperature);
  const humidity     = useSlave1Store((s) => s.humidity);
  const pressure     = useSlave1Store((s) => s.pressure);
  const fanSpeed     = useSlave1Store((s) => s.fanSpeed);
  const online       = useSlave1Store((s) => s.online);
  const lastUpdateMs = useSlave1Store((s) => s.lastUpdateMs);

  const [stale, setStale] = useState(false);

  useEffect(() => {
    const check = () => {
      if (lastUpdateMs === null) {
        setStale(true);
        return;
      }
      setStale(Date.now() - lastUpdateMs > STALE_THRESHOLD_MS);
    };
    check();
    const interval = setInterval(check, 5000);
    return () => clearInterval(interval);
  }, [lastUpdateMs]);

  const showValues = !stale;

  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Lüfter Slave1 — Betrieb</Text>
        <View style={[styles.onlineDot, online ? styles.dotOnline : styles.dotOffline]} />
      </View>

      <View style={styles.speedRow}>
        <Text style={styles.speedValue}>
          {showValues && fanSpeed !== null ? `${fanSpeed}%` : "—"}
        </Text>
        <Text style={styles.speedLabel}>Lüftergeschwindigkeit</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.sensorRow}>
        <View style={styles.sensorItem}>
          <Text style={styles.sensorValue}>
            {showValues && temperature !== null ? `${temperature.toFixed(1)}°C` : "—"}
          </Text>
          <Text style={styles.sensorLabel}>Temperatur</Text>
        </View>
        <View style={styles.sensorItem}>
          <Text style={styles.sensorValue}>
            {showValues && humidity !== null ? `${humidity.toFixed(1)}%` : "—"}
          </Text>
          <Text style={styles.sensorLabel}>Luftfeuchte</Text>
        </View>
        <View style={styles.sensorItem}>
          <Text style={styles.sensorValue}>
            {showValues && pressure !== null ? pressure.toFixed(1) : "—"}
          </Text>
          <Text style={styles.sensorLabel}>hPa</Text>
        </View>
      </View>
    </View>
  );
}
