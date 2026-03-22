import { Text, TouchableOpacity } from "react-native";
import { usePresetsStore, Preset } from "../../../store/presetsStore";
import styles from "./style";

interface PresetCardProps {
  preset: Preset;
  editMode: boolean;
  onEdit: () => void;
}

export default function PresetCard({ preset, editMode, onEdit }: PresetCardProps) {
  const applyPreset = usePresetsStore((s) => s.applyPreset);

  const handlePress = () => {
    if (editMode) {
      onEdit();
    } else {
      applyPreset(preset.id);
    }
  };

  return (
    <TouchableOpacity style={[styles.card, editMode && styles.cardEditMode]} onPress={handlePress} activeOpacity={0.75}>
      <Text style={styles.name} numberOfLines={1}>{preset.name}</Text>
    </TouchableOpacity>
  );
}
