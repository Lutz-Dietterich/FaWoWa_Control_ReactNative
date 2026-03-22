import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

export const QUICK_COLORS = [
  "#FF0000",
  "#FF8800",
  "#FFFF00",
  "#00FF00",
  "#00FFFF",
  "#0000FF",
  "#FF00FF",
  "#FFFFFF",
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <View>
      <View style={styles.preview}>
        <View style={[styles.colorCircle, { backgroundColor: value }]} />
        <Text style={styles.colorLabel}>{value.toUpperCase()}</Text>
      </View>
      <View style={styles.grid}>
        {QUICK_COLORS.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.colorButton, { backgroundColor: c }, value === c && styles.colorButtonActive]}
            onPress={() => onChange(c)}
            activeOpacity={0.8}
          />
        ))}
      </View>
    </View>
  );
}
