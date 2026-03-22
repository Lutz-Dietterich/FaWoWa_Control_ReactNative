import { View, Text, TouchableOpacity } from "react-native";
import IconButton from "../../Buttons/IconButton";
import { usePresetsStore, Preset } from "../../../store/presetsStore";
import styles from "./style";

interface PresetCardProps {
  preset: Preset;
  onEdit: () => void;
}

const LIGHT_LABELS: Record<string, string> = {
  raum: "R",
  fach: "F",
  alfred: "A",
};

export default function PresetCard({ preset, onEdit }: PresetCardProps) {
  const applyPreset = usePresetsStore((s) => s.applyPreset);

  return (
    <TouchableOpacity style={styles.card} onPress={() => applyPreset(preset.id)} activeOpacity={0.75}>
      <View style={styles.header}>
        <Text style={styles.name} numberOfLines={1}>{preset.name}</Text>
        <IconButton name="edit" onPress={onEdit} size={16} color="#808080" />
      </View>
      <View style={styles.lights}>
        {(["raum", "fach", "alfred"] as const).map((id) => (
          <View key={id} style={styles.lightRow}>
            <View style={[styles.colorDot, { backgroundColor: preset.lights[id].color }]} />
            <Text style={styles.lightLabel}>{LIGHT_LABELS[id]}</Text>
            <Text style={styles.brightnessLabel}>{preset.lights[id].brightness}%</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}
