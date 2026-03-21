import { useState } from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import IconLight from "../../../../assets/iconLight.svg";
import IconLightOn from "../../../../assets/iconLightOn.svg";
import LightSettingsCard from "../LightSettingsCard";
import { useLightsStore, LightId } from "../../../store/lightsStore";
import styles from "./style";

interface LightCardProps {
  title: string;
  id: LightId;
}

const ICON_SIZE = 40;

export default function LightCard({ title, id }: LightCardProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const light = useLightsStore((s) => s.lights[id]);
  const setPower = useLightsStore((s) => s.setPower);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        {light.power ? (
          <IconLightOn width={ICON_SIZE} height={ICON_SIZE} />
        ) : (
          <IconLight width={ICON_SIZE} height={ICON_SIZE} />
        )}
        <Switch
          value={light.power}
          onValueChange={(val) => setPower(id, val)}
          trackColor={{ false: "#1e1e1e", true: "#4f4e4e" }}
          thumbColor={light.power ? "#39FF14" : "#808080"}
        />
      </View>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.bottomRow} onPress={() => setSettingsOpen(true)}>
        <Text style={styles.status}>{light.power ? "ON" : "OFF"}</Text>
        <MaterialIcons name="settings" size={28} color="#808080" />
      </TouchableOpacity>
      <LightSettingsCard
        title={title}
        id={id}
        visible={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </View>
  );
}
