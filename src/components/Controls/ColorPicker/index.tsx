import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import WheelColorPicker from "react-native-wheel-color-picker";
import { useQuickColorsStore } from "../../../store/quickColorsStore";
import colours from "../../../theme/colours";
import styles from "./style";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

type Mode = "normal" | "edit" | "delete";
type PickerMode = "select" | "add" | "replace";

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  const quickColors = useQuickColorsStore((s) => s.colors);
  const addColor = useQuickColorsStore((s) => s.addColor);
  const removeColor = useQuickColorsStore((s) => s.removeColor);
  const replaceColor = useQuickColorsStore((s) => s.replaceColor);

  const [mode, setMode] = useState<Mode>("normal");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerColor, setPickerColor] = useState(value);
  const [pickerMode, setPickerMode] = useState<PickerMode>("select");
  const [replacingColor, setReplacingColor] = useState<string | null>(null);

  const toggleMode = (m: Mode) => setMode((prev) => (prev === m ? "normal" : m));

  const openSelectPicker = () => {
    setPickerColor(value);
    setPickerMode("select");
    setPickerOpen(true);
  };

  const openAddPicker = () => {
    setPickerColor("#FFFFFF");
    setPickerMode("add");
    setPickerOpen(true);
  };

  const openReplacePicker = (color: string) => {
    setPickerColor(color);
    setReplacingColor(color);
    setPickerMode("replace");
    setPickerOpen(true);
  };

  const handleConfirm = () => {
    if (pickerMode === "select") {
      onChange(pickerColor);
    } else if (pickerMode === "add") {
      addColor(pickerColor);
    } else if (pickerMode === "replace" && replacingColor) {
      replaceColor(replacingColor, pickerColor);
    }
    setPickerOpen(false);
  };

  const handleColorPress = (c: string) => {
    if (mode === "normal") onChange(c);
    else if (mode === "edit") openReplacePicker(c);
  };

  return (
    <View>
      <View style={styles.preview}>
        <TouchableOpacity
          style={[styles.colorCircle, { backgroundColor: value }]}
          onPress={openSelectPicker}
          activeOpacity={0.8}
        />
        <Text style={styles.colorLabel}>{value.toUpperCase()}</Text>
      </View>

      <View style={styles.grid}>
        {quickColors.map((c) => (
          <View key={c} style={styles.colorButtonWrapper}>
            <TouchableOpacity
              style={[styles.colorButton, { backgroundColor: c }, value === c && mode === "normal" && styles.colorButtonActive]}
              onPress={() => handleColorPress(c)}
              activeOpacity={0.8}
            />
            {mode === "delete" && (
              <TouchableOpacity style={styles.deleteButton} onPress={() => removeColor(c)}>
                <MaterialIcons name="close" size={10} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        ))}

        {mode === "edit" && (
          <TouchableOpacity style={styles.addButton} onPress={openAddPicker} activeOpacity={0.8}>
            <MaterialIcons name="add" size={20} color={colours.text.accent} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => toggleMode("edit")} style={styles.editButton}>
          <MaterialIcons
            name={mode === "edit" ? "edit-off" : "edit"}
            size={18}
            color={mode === "edit" ? colours.text.accent : "#808080"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleMode("delete")} style={styles.editButton}>
          <MaterialIcons
            name="delete-outline"
            size={18}
            color={mode === "delete" ? "#FF4444" : "#808080"}
          />
        </TouchableOpacity>
      </View>

      <Modal visible={pickerOpen} transparent animationType="fade" onRequestClose={() => setPickerOpen(false)}>
        <View style={pickerStyles.overlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setPickerOpen(false)} />
          <View style={pickerStyles.card}>
            <View style={pickerStyles.wheel}>
              <WheelColorPicker
                color={pickerColor}
                onColorChange={setPickerColor}
                thumbSize={30}
                sliderSize={20}
                noSnap
                swatches={false}
              />
            </View>
            <TouchableOpacity style={pickerStyles.confirmButton} onPress={handleConfirm}>
              <Text style={pickerStyles.confirmText}>Übernehmen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const pickerStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(19, 19, 19, 0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "rgba(0,0,0,0.85)",
    borderRadius: 12,
    padding: 24,
  },
  wheel: {
    height: 280,
  },
  confirmButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: colours.text.accent,
    alignItems: "center",
  },
  confirmText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "600",
  },
});
