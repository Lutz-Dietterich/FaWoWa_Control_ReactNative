import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

const BRIGHTNESS_PRESETS = [25, 50, 75, 100];

interface BrightnessPickerProps {
  value: number;
  onChange: (value: number) => void;
}

export default function BrightnessPicker({ value, onChange }: BrightnessPickerProps) {
  return (
    <View style={styles.row}>
      {BRIGHTNESS_PRESETS.map((val) => (
        <TouchableOpacity
          key={val}
          style={[styles.button, value === val && styles.buttonActive]}
          onPress={() => onChange(val)}
          activeOpacity={0.7}
        >
          <Text style={[styles.text, value === val && styles.textActive]}>{val}%</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
