import { TouchableOpacity, Text } from "react-native";
import styles from "./style";

interface Co2ButtonProps {
  co2On: boolean;
  onToggle: () => void;
}

export default function Co2Button({ co2On, onToggle }: Co2ButtonProps) {
  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.7} style={styles.button}>
      <Text style={[styles.label, co2On && styles.labelOn]}>CO₂</Text>
    </TouchableOpacity>
  );
}
