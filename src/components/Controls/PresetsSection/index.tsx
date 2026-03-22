import { useState } from "react";
import { View, Text } from "react-native";
import IconButton from "../../Buttons/IconButton";
import PresetCard from "../PresetCard";
import PresetEditModal from "../PresetEditModal";
import { usePresetsStore, Preset } from "../../../store/presetsStore";
import colours from "../../../theme/colours";
import styles from "./style";

export default function PresetsSection() {
  const presets = usePresetsStore((s) => s.presets);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPreset, setEditingPreset] = useState<Preset | null>(null);

  const openNew = () => {
    setEditingPreset(null);
    setModalOpen(true);
  };

  const openEdit = (preset: Preset) => {
    setEditingPreset(preset);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Presets</Text>
        <IconButton name="add" onPress={openNew} size={26} color={colours.text.accent} />
      </View>

      {presets.length === 0 ? (
        <Text style={styles.empty}>Noch keine Presets — tippe auf "+" um eines zu erstellen.</Text>
      ) : (
        <View style={styles.grid}>
          {presets.map((preset) => (
            <PresetCard key={preset.id} preset={preset} onEdit={() => openEdit(preset)} />
          ))}
        </View>
      )}

      {modalOpen && (
        <PresetEditModal preset={editingPreset} onClose={closeModal} />
      )}
    </View>
  );
}
