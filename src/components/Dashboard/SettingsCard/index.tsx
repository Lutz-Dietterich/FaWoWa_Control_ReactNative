import { useState } from "react";
import { View, Text } from "react-native";
import SetpointDisplay from "../SetpointDisplay";
import StepButton from "../../Buttons/StepButton";
import TempButton from "../../Buttons/TempButton";
import HumButton from "../../Buttons/HumButton";
import { useFanStore } from "../../../store/fanStore";
import styles from "./style";

export default function SettingsCard() {
  const [mode, setMode] = useState<"temp" | "hum">("temp");

  const targetTemp = useFanStore((s) => s.targetTemp);
  const targetHumidity = useFanStore((s) => s.targetHumidity);
  const setTargetTemp = useFanStore((s) => s.setTargetTemp);
  const setTargetHumidity = useFanStore((s) => s.setTargetHumidity);

  const isTemp = mode === "temp";
  const isHum = mode === "hum";

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{isTemp ? "Temperatur" : "Luftfeuchigkeit"}</Text>
      <SetpointDisplay isTemp={isTemp} value={isTemp ? targetTemp : targetHumidity} />
      <View style={styles.gaugeButtonContainer}>
        <StepButton
          type="minus"
          onPress={() => {
            if (isTemp) {
              if (targetTemp > 0) setTargetTemp(targetTemp - 1);
            } else {
              if (targetHumidity > 0) setTargetHumidity(targetHumidity - 1);
            }
          }}
        />
        <StepButton
          type="plus"
          onPress={() => {
            if (isTemp) {
              if (targetTemp < 35) setTargetTemp(targetTemp + 1);
            } else {
              if (targetHumidity < 100) setTargetHumidity(targetHumidity + 1);
            }
          }}
        />
      </View>
      <View style={styles.switchButtonContainer}>
        <View style={styles.tempHumButtonContainer}>
          <TempButton tempOn={isTemp} onToggle={() => setMode("temp")} />
          <HumButton humOn={isHum} onToggle={() => setMode("hum")} />
        </View>
      </View>
    </View>
  );
}
