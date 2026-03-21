import { useState } from "react";
import { View, Text } from "react-native";
import SetpointDisplay from "../SetpointDisplay";
import StepButton from "../../Buttons/StepButton";
import TempButton from "../../Buttons/TempButton";
import HumButton from "../../Buttons/HumButton";
import styles from "./style";

export default function SettingsCard() {
  const [mode, setMode] = useState<"temp" | "hum">("temp");
  const [valueTemp, setValueTemp] = useState(25);
  const [valueHum, setValueHum] = useState(60);

  const isTemp = mode === "temp";
  const isHum = mode === "hum";

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{isTemp ? "Temperatur" : "Luftfeuchigkeit"}</Text>
      <SetpointDisplay isTemp={isTemp} value={isTemp ? valueTemp : valueHum} />
      <View style={styles.gaugeButtonContainer}>
        <StepButton
          type="minus"
          onPress={() => {
            if (isTemp) {
              if (valueTemp > 0) setValueTemp(valueTemp - 1);
            } else {
              if (valueHum > 0) setValueHum(valueHum - 1);
            }
          }}
        />
        <StepButton
          type="plus"
          onPress={() => {
            if (isTemp) {
              if (valueTemp < 35) setValueTemp(valueTemp + 1);
            } else {
              if (valueHum < 100) setValueHum(valueHum + 1);
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
