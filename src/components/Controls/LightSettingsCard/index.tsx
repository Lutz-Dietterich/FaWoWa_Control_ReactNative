import { View, Text, Modal, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ColorPicker from "../ColorPicker";
import BrightnessPicker from "../BrightnessPicker";
import { useLightsStore, LightId } from "../../../store/lightsStore";
import styles from "./style";

interface LightSettingsCardProps {
  title: string;
  id: LightId;
  visible: boolean;
  onClose: () => void;
}

export default function LightSettingsCard({ title, id, visible, onClose }: LightSettingsCardProps) {
  const light = useLightsStore((s) => s.lights[id]);
  const setColor = useLightsStore((s) => s.setColor);
  const setBrightness = useLightsStore((s) => s.setBrightness);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={22} color="#808080" />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Farbauswahl</Text>
            <ColorPicker value={light.color} onChange={(c) => setColor(id, c)} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Helligkeit: {light.brightness}%</Text>
            <BrightnessPicker value={light.brightness} onChange={(v) => setBrightness(id, v)} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
