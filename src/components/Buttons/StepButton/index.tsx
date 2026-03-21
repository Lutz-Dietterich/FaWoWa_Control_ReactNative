import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import styles from "./style";

interface StepButtonProps {
  type: "plus" | "minus";
  onPress: () => void;
  disabled?: boolean;
}

export default function StepButton({ type, onPress, disabled = false }: StepButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={disabled ? styles.buttonDisabled : undefined}
    >
      <LinearGradient
        colors={["#848184", "#DADADA"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={styles.label}>{type === "plus" ? "+" : "−"}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
