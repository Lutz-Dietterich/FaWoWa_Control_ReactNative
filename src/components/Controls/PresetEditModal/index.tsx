import { useState } from "react";
import { View, Text, Modal, TouchableOpacity, Pressable, TextInput, ScrollView, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ColorPicker from "../ColorPicker";
import BrightnessPicker from "../BrightnessPicker";
import { usePresetsStore, Preset, LightPreset } from "../../../store/presetsStore";
import styles from "./style";

interface PresetEditModalProps {
  preset: Preset | null;
  onClose: () => void;
}

const DEFAULT_LIGHT: LightPreset = { color: "#FFFFFF", brightness: 50 };

const LIGHT_LABELS: Record<string, string> = {
  raum: "Raum",
  fach: "Fach",
  alfred: "Alfred",
};

export default function PresetEditModal({ preset, onClose }: PresetEditModalProps) {
  const addPreset = usePresetsStore((s) => s.addPreset);
  const updatePreset = usePresetsStore((s) => s.updatePreset);
  const deletePreset = usePresetsStore((s) => s.deletePreset);

  const isNew = preset === null;

  const [name, setName] = useState(preset?.name ?? "");
  const [lights, setLights] = useState({
    raum: preset?.lights.raum ?? { ...DEFAULT_LIGHT },
    fach: preset?.lights.fach ?? { ...DEFAULT_LIGHT },
    alfred: preset?.lights.alfred ?? { ...DEFAULT_LIGHT },
  });

  const setLightColor = (id: keyof typeof lights, color: string) => {
    setLights((prev) => ({ ...prev, [id]: { ...prev[id], color } }));
  };

  const setLightBrightness = (id: keyof typeof lights, brightness: number) => {
    setLights((prev) => ({ ...prev, [id]: { ...prev[id], brightness } }));
  };

  const handleSave = () => {
    if (!name.trim()) return;
    if (isNew) {
      addPreset({ name: name.trim(), lights });
    } else {
      updatePreset(preset.id, { name: name.trim(), lights });
    }
    onClose();
  };

  const handleDelete = () => {
    if (!isNew) {
      deletePreset(preset.id);
      onClose();
    }
  };

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{isNew ? "Neues Preset" : "Preset bearbeiten"}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={22} color="#808080" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Preset Name..."
                placeholderTextColor="#555555"
              />
            </View>

            {(["raum", "fach", "alfred"] as const).map((id) => (
              <View key={id} style={styles.section}>
                <Text style={styles.sectionTitle}>{LIGHT_LABELS[id]}</Text>
                <Text style={styles.subLabel}>Farbe</Text>
                <ColorPicker value={lights[id].color} onChange={(c) => setLightColor(id, c)} />
                <Text style={[styles.subLabel, styles.subLabelTop]}>
                  Helligkeit: {lights[id].brightness}%
                </Text>
                <BrightnessPicker
                  value={lights[id].brightness}
                  onChange={(v) => setLightBrightness(id, v)}
                />
              </View>
            ))}
          </ScrollView>

          <View style={styles.actions}>
            {!isNew && (
              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <MaterialIcons name="delete-outline" size={20} color="#FF4444" />
                <Text style={styles.deleteText}>Löschen</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.saveButton, !name.trim() && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={!name.trim()}
            >
              <Text style={styles.saveText}>Speichern</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
