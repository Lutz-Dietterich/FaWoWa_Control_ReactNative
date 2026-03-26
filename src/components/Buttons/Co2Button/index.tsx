import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colours from "../../../theme/colours";
import styles from "./style";

interface Co2ButtonProps {
  co2On: boolean;
  onToggle: () => void;
}

export default function Co2Button({ co2On, onToggle }: Co2ButtonProps) {
  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.7} style={styles.button}>
      <MaterialCommunityIcons
        name="molecule-co2"
        size={48}
        color={co2On ? colours.text.accent : colours.text.secondary}
      />
    </TouchableOpacity>
  );
}
