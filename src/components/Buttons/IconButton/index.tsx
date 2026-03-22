import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./style";

interface IconButtonProps {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  onPress: () => void;
  size?: number;
  color?: string;
}

export default function IconButton({ name, onPress, size = 24, color = "#808080" }: IconButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.7}>
      <MaterialIcons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}
