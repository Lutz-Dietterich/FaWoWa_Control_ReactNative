import { useState } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import SetpointDisplay from "../SetpointDisplay";
import StepButton from "../../Buttons/StepButton";
import TempButton from "../../Buttons/TempButton";
import HumButton from "../../Buttons/HumButton";
import Co2Button from "../../Buttons/Co2Button";
import { FontAwesome } from "@expo/vector-icons";
import { useFanStore } from "../../../store/fanStore";
import { useSlave1Store } from "../../../store/slave1Store";
import { useBluetoothStore } from "../../../store/bluetoothStore";
import { CHAR_SENSOR_CTRL } from "../../../constants/ble";
import styles from "./style";

type Mode = "temp" | "hum" | "co2";
type Fan  = "fan1" | "slave1";

function OffsetRow({
  label, value, onChange, min, max, step, unit,
}: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; unit: string;
}) {
  return (
    <View style={styles.offsetRow}>
      <Text style={styles.offsetLabel}>{label}{unit ? ` — ${unit}` : ""}</Text>
      <View style={styles.offsetControls}>
        <TouchableOpacity style={styles.offsetBtn} onPress={() => onChange(Math.max(min, value - step))}>
          <Text style={styles.offsetBtnText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.offsetValue}>{value}</Text>
        <TouchableOpacity style={styles.offsetBtn} onPress={() => onChange(Math.min(max, value + step))}>
          <Text style={styles.offsetBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function SettingsCard() {
  const [mode, setMode]               = useState<Mode>("temp");
  const [fan, setFan]                 = useState<Fan>("fan1");
  const [modalVisible, setModalVisible] = useState(false);
  const [manualSpeed, setManualSpeed] = useState(0);

  const store   = useFanStore();
  const slave1  = useSlave1Store();
  const sendCommand = useBluetoothStore((s) => s.sendCommand);

  const isFan1   = fan === "fan1";
  const isSlave1 = fan === "slave1";
  const isTemp   = mode === "temp";
  const isHum    = mode === "hum";
  const isCo2    = mode === "co2" && isFan1;

  const handleFanSwitch = (selected: Fan) => {
    setFan(selected);
    if (selected === "slave1" && mode === "co2") setMode("temp");
  };

  // Fan1 update helper
  const f1update = (key: string) => (value: number) =>
    store.saveAllFan1Settings({ ...store, [key]: value });

  // Slave1 update helper
  const s1update = (key: string) => (value: number) =>
    slave1.saveAllSlave1Settings({ ...slave1, [key]: value });

  const currentValue = isFan1
    ? (isTemp ? store.targetTemp : isCo2 ? store.targetCo2 : store.targetHum)
    : (isTemp ? slave1.targetTemp : slave1.targetHum);

  const handleMinus = () => {
    if (isFan1) {
      if (isTemp) store.setTargetTemp(Math.max(0, store.targetTemp - 1));
      else if (isHum) store.setTargetHum(Math.max(0, store.targetHum - 1));
      else if (isCo2) store.saveAllFan1Settings({ ...store, targetCo2: Math.max(400, store.targetCo2 - 50) });
    } else {
      if (isTemp) slave1.saveAllSlave1Settings({ ...slave1, targetTemp: Math.max(0, slave1.targetTemp - 1) });
      else if (isHum) slave1.saveAllSlave1Settings({ ...slave1, targetHum: Math.max(0, slave1.targetHum - 1) });
    }
  };

  const handlePlus = () => {
    if (isFan1) {
      if (isTemp) store.setTargetTemp(Math.min(35, store.targetTemp + 1));
      else if (isHum) store.setTargetHum(Math.min(100, store.targetHum + 1));
      else if (isCo2) store.saveAllFan1Settings({ ...store, targetCo2: Math.min(2000, store.targetCo2 + 50) });
    } else {
      if (isTemp) slave1.saveAllSlave1Settings({ ...slave1, targetTemp: Math.min(35, slave1.targetTemp + 1) });
      else if (isHum) slave1.saveAllSlave1Settings({ ...slave1, targetHum: Math.min(100, slave1.targetHum + 1) });
    }
  };

  const modalTitle = isTemp ? "Temperatur" : isHum ? "Luftfeuchte" : "CO₂";

  return (
    <View style={styles.card}>
      <View style={styles.fanSelector}>
        <TouchableOpacity
          style={[styles.fanTab, isFan1 && styles.fanTabActive]}
          onPress={() => handleFanSwitch("fan1")}
        >
          <Text style={[styles.fanTabText, isFan1 && styles.fanTabTextActive]}>Fan 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.fanTab, isSlave1 && styles.fanTabActive]}
          onPress={() => handleFanSwitch("slave1")}
        >
          <Text style={[styles.fanTabText, isSlave1 && styles.fanTabTextActive]}>Slave</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>
        {isTemp ? "Temperatur" : isHum ? "Luftfeuchigkeit" : "CO₂"}
      </Text>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.gearBtn}>
        <FontAwesome name="gear" size={24} color="#39FF14" />
      </TouchableOpacity>

      <SetpointDisplay isTemp={isTemp} isCo2={isCo2} value={currentValue} />

      <View style={styles.gaugeButtonContainer}>
        <StepButton type="minus" onPress={handleMinus} />
        <StepButton type="plus" onPress={handlePlus} />
      </View>

      <View style={styles.switchButtonContainer}>
        <View style={styles.tempHumButtonContainer}>
          <TempButton tempOn={isTemp} onToggle={() => setMode("temp")} />
          <HumButton humOn={isHum} onToggle={() => setMode("hum")} />
          <View style={isSlave1 ? styles.hiddenBtn : undefined}>
            <Co2Button co2On={isCo2} onToggle={() => setMode("co2")} />
          </View>
        </View>
        <View style={styles.manualSpeedControl}>
          <TouchableOpacity
            style={styles.manualSpeedBtn}
            onPress={() => setManualSpeed((v) => Math.max(0, v - 5))}
          >
            <Text style={styles.manualSpeedBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.manualSpeedValue}>{manualSpeed}%</Text>
          <TouchableOpacity
            style={styles.manualSpeedBtn}
            onPress={() => setManualSpeed((v) => Math.min(100, v + 5))}
          >
            <Text style={styles.manualSpeedBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setModalVisible(false)}>
              <FontAwesome name="close" size={24} color="#39FF14" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {isSlave1 ? "Slave — " : ""}{modalTitle} — Feineinstellungen
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>

            {/* Fan1 Feineinstellungen */}
            {isFan1 && isTemp && (
              <>
                <OffsetRow label="Startet" value={store.tempBelowOffset} onChange={f1update("tempBelowOffset")} min={0} max={10} step={1} unit="°C vor Sollwert" />
                <OffsetRow label="100% bei" value={store.tempAboveOffset} onChange={f1update("tempAboveOffset")} min={0} max={10} step={1} unit="°C über Sollwert" />
              </>
            )}
            {isFan1 && isHum && (
              <>
                <OffsetRow label="Startet" value={store.humBelowOffset} onChange={f1update("humBelowOffset")} min={0} max={20} step={1} unit="% vor Sollwert" />
                <OffsetRow label="100% bei" value={store.humAboveOffset} onChange={f1update("humAboveOffset")} min={0} max={20} step={1} unit="% über Sollwert" />
              </>
            )}
            {isFan1 && isCo2 && (
              <>
                <OffsetRow label="Startet" value={store.co2BelowOffset} onChange={f1update("co2BelowOffset")} min={0} max={500} step={50} unit="ppm vor Sollwert" />
                <OffsetRow label="100% bei" value={store.co2AboveOffset} onChange={f1update("co2AboveOffset")} min={0} max={1000} step={50} unit="ppm über Sollwert" />
                <OffsetRow label="Einschalt-Drehzahl" value={store.minSpeed} onChange={f1update("minSpeed")} min={15} max={50} step={5} unit="%" />
                <View style={styles.modalDivider} />
                <Text style={styles.modalSectionLabel}>Heizmodus</Text>
                <OffsetRow label="Dauer" value={store.heatModeDuration} onChange={store.setHeatModeDuration} min={1} max={100000} step={1} unit="min" />
                <OffsetRow label="CO₂-Sollwert" value={store.heatTargetCo2} onChange={store.setHeatTargetCo2} min={400} max={100000} step={50} unit="ppm" />
                <OffsetRow label="Temperatur" value={store.heatTargetTemp} onChange={store.setHeatTargetTemp} min={5} max={50} step={1} unit="°C" />
                <OffsetRow label="Startet" value={store.heatCo2BelowOffset} onChange={store.setHeatCo2BelowOffset} min={0} max={100000} step={50} unit="ppm vor Sollwert" />
                <OffsetRow label="100% bei" value={store.heatCo2AboveOffset} onChange={store.setHeatCo2AboveOffset} min={0} max={100000} step={50} unit="ppm über Sollwert" />
                <OffsetRow label="Einschalt-Drehzahl" value={store.heatMinSpeed} onChange={store.setHeatMinSpeed} min={5} max={100} step={5} unit="%" />
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

            {/* Slave1 Feineinstellungen */}
            {isSlave1 && isTemp && (
              <>
                <OffsetRow label="Startet" value={slave1.tempBelowOffset} onChange={s1update("tempBelowOffset")} min={0} max={10} step={1} unit="°C vor Sollwert" />
                <OffsetRow label="100% bei" value={slave1.tempAboveOffset} onChange={s1update("tempAboveOffset")} min={0} max={10} step={1} unit="°C über Sollwert" />
              </>
            )}
            {isSlave1 && isHum && (
              <>
                <OffsetRow label="Startet" value={slave1.humBelowOffset} onChange={s1update("humBelowOffset")} min={0} max={20} step={1} unit="% vor Sollwert" />
                <OffsetRow label="100% bei" value={slave1.humAboveOffset} onChange={s1update("humAboveOffset")} min={0} max={20} step={1} unit="% über Sollwert" />
              </>
            )}
            {isSlave1 && (
              <>
                <View style={styles.modalDivider} />
                <OffsetRow label="Einschalt-Drehzahl" value={slave1.minSpeed} onChange={s1update("minSpeed")} min={5} max={100} step={5} unit="%" />
              </>
            )}

            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
