import { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import SetpointDisplay from "../SetpointDisplay";
import StepButton from "../../Buttons/StepButton";
import TempButton from "../../Buttons/TempButton";
import HumButton from "../../Buttons/HumButton";
import Co2Button from "../../Buttons/Co2Button";
import { useFanStore } from "../../../store/fanStore";
import { useBluetoothStore } from "../../../store/bluetoothStore";
import { CHAR_SENSOR_CTRL } from "../../../constants/ble";
import styles from "./style";

type Mode = "temp" | "hum" | "co2";

function OffsetRow({
  label, value, onChange, min, max, step, unit,
}: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; unit: string;
}) {
  return (
    <View style={styles.offsetRow}>
      <Text style={styles.offsetLabel}>{label}</Text>
      <View style={styles.offsetControls}>
        <TouchableOpacity style={styles.offsetBtn} onPress={() => onChange(Math.max(min, value - step))}>
          <Text style={styles.offsetBtnText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.offsetValue}>{value}{unit}</Text>
        <TouchableOpacity style={styles.offsetBtn} onPress={() => onChange(Math.min(max, value + step))}>
          <Text style={styles.offsetBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function SettingsCard() {
  const [mode, setMode] = useState<Mode>("temp");
  const [modalVisible, setModalVisible] = useState(false);

  const store = useFanStore();
  const sendCommand = useBluetoothStore((s) => s.sendCommand);

  const update = (key: string) => (value: number) =>
    store.saveAllFan1Settings({ ...store, [key]: value });

  const isTemp = mode === "temp";
  const isHum = mode === "hum";
  const isCo2 = mode === "co2";

  const currentValue = isTemp ? store.targetTemp : isCo2 ? store.targetCo2 : store.targetHum;

  const handleMinus = () => {
    if (isTemp && store.targetTemp > 0) store.setTargetTemp(store.targetTemp - 1);
    else if (isHum && store.targetHum > 0) store.setTargetHum(store.targetHum - 1);
    else if (isCo2) store.saveAllFan1Settings({ ...store, targetCo2: Math.max(400, store.targetCo2 - 50) });
  };

  const handlePlus = () => {
    if (isTemp && store.targetTemp < 35) store.setTargetTemp(store.targetTemp + 1);
    else if (isHum && store.targetHum < 100) store.setTargetHum(store.targetHum + 1);
    else if (isCo2) store.saveAllFan1Settings({ ...store, targetCo2: Math.min(2000, store.targetCo2 + 50) });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {isTemp ? "Temperatur" : isHum ? "Luftfeuchigkeit" : "CO₂"}
      </Text>

      <SetpointDisplay isTemp={isTemp} isCo2={isCo2} value={currentValue} />

      <View style={styles.gaugeButtonContainer}>
        <StepButton type="minus" onPress={handleMinus} />
        <StepButton type="plus" onPress={handlePlus} />
      </View>

      <View style={styles.switchButtonContainer}>
        <View style={styles.tempHumButtonContainer}>
          <TempButton tempOn={isTemp} onToggle={() => setMode("temp")} />
          <HumButton humOn={isHum} onToggle={() => setMode("hum")} />
          <Co2Button co2On={isCo2} onToggle={() => setMode("co2")} />
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.fineSettingsBtn}>Feineinstellungen</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalVisible(false)}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {isTemp ? "Temperatur" : isHum ? "Luftfeuchte" : "CO₂"} — Feineinstellungen
            </Text>

            {isTemp && (
              <>
                <OffsetRow label="Startet" value={store.tempBelowOffset} onChange={update("tempBelowOffset")} min={0} max={10} step={1} unit="°C vor Sollwert" />
                <OffsetRow label="100% bei" value={store.tempAboveOffset} onChange={update("tempAboveOffset")} min={0} max={10} step={1} unit="°C über Sollwert" />
              </>
            )}

            {isHum && (
              <>
                <OffsetRow label="Startet" value={store.humBelowOffset} onChange={update("humBelowOffset")} min={0} max={20} step={1} unit="% vor Sollwert" />
                <OffsetRow label="100% bei" value={store.humAboveOffset} onChange={update("humAboveOffset")} min={0} max={20} step={1} unit="% über Sollwert" />
              </>
            )}

            {isCo2 && (
              <>
                <OffsetRow label="Startet" value={store.co2BelowOffset} onChange={update("co2BelowOffset")} min={0} max={500} step={50} unit=" ppm vor Sollwert" />
                <OffsetRow label="100% bei" value={store.co2AboveOffset} onChange={update("co2AboveOffset")} min={0} max={1000} step={50} unit=" ppm über Sollwert" />
                <OffsetRow label="Einschalt-Drehzahl" value={store.minSpeed} onChange={update("minSpeed")} min={15} max={50} step={5} unit="%" />
                <View style={styles.modalDivider} />
                <TouchableOpacity
                  style={styles.calibrateBtn}
                  onPress={() => {
                    sendCommand(CHAR_SENSOR_CTRL, JSON.stringify({ cmd: "frc" }));
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.calibrateBtnText}>Sensor auf 700 ppm kalibrieren</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
