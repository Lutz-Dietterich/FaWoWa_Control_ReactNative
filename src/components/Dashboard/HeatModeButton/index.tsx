import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useFanStore } from "../../../store/fanStore";
import styles from "./style";

function formatCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

const HeatModeButton = () => {
  const heatModeActive = useFanStore((s) => s.heatModeActive);
  const heatModeEndTime = useFanStore((s) => s.heatModeEndTime);
  const activateHeatMode = useFanStore((s) => s.activateHeatMode);
  const deactivateHeatMode = useFanStore((s) => s.deactivateHeatMode);

  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    if (!heatModeActive || heatModeEndTime === null) return;
    const interval = setInterval(() => {
      setRemaining(heatModeEndTime - Date.now());
    }, 1000);
    setRemaining(heatModeEndTime - Date.now());
    return () => clearInterval(interval);
  }, [heatModeActive, heatModeEndTime]);

  if (heatModeActive) {
    return (
      <TouchableOpacity onPress={deactivateHeatMode} style={styles.button}>
        <View style={styles.activeContent}>
          <FontAwesome5 name="gripfire" size={24} color="#39FF14" />
          <Text style={styles.countdown}>{formatCountdown(remaining)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={activateHeatMode} style={styles.button}>
      <FontAwesome5 name="gripfire" size={24} color="#FF3B30" />
    </TouchableOpacity>
  );
};

export default HeatModeButton;
