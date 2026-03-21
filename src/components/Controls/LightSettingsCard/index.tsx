import { View, Text, Modal, TouchableOpacity, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLightsStore, LightId } from "../../../store/lightsStore";
import styles from "./style";

interface LightSettingsCardProps {
  title: string;
  id: LightId;
  visible: boolean;
  onClose: () => void;
}

const QUICK_COLORS = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFFFFF",
  "#FFA500",
];

const BRIGHTNESS_PRESETS = [25, 50, 75, 100];

export default function LightSettingsCard({ title, id, visible, onClose }: LightSettingsCardProps) {
  const light = useLightsStore((s) => s.lights[id]);
  const setColor = useLightsStore((s) => s.setColor);
  const setBrightness = useLightsStore((s) => s.setBrightness);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={() => {}}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={22} color="#808080" />
            </TouchableOpacity>
          </View>

          {/* Farbauswahl */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Farbauswahl</Text>
            <View style={styles.colorPreview}>
              <View style={[styles.colorCircle, { backgroundColor: light.color }]} />
              <Text style={styles.colorLabel}>{light.color}</Text>
            </View>
            <View style={styles.quickColors}>
              {QUICK_COLORS.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[
                    styles.colorButton,
                    { backgroundColor: c },
                    light.color === c && styles.colorButtonActive,
                  ]}
                  onPress={() => setColor(id, c)}
                />
              ))}
            </View>
          </View>

          {/* Helligkeit */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Helligkeit: {light.brightness}%</Text>
            <View style={styles.brightnessButtons}>
              {BRIGHTNESS_PRESETS.map((val) => (
                <TouchableOpacity
                  key={val}
                  style={[
                    styles.brightnessButton,
                    light.brightness === val && styles.brightnessButtonActive,
                  ]}
                  onPress={() => setBrightness(id, val)}
                >
                  <Text
                    style={[
                      styles.brightnessButtonText,
                      light.brightness === val && styles.brightnessButtonTextActive,
                    ]}
                  >
                    {val}%
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
