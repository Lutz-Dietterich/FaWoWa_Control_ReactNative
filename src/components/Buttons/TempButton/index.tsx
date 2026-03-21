import { TouchableOpacity } from "react-native";
import IconTemp from "../../../../assets/iconTemp.svg";
import IconTempOn from "../../../../assets/iconTempOn.svg";
import styles from "./style";

interface TempButtonProps {
  tempOn: boolean;
  onToggle: () => void;
}

const ICON_SIZE = 32;

export default function TempButton({ tempOn, onToggle }: TempButtonProps) {
  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.7} style={styles.button}>
      {tempOn ? (
        <IconTempOn width={ICON_SIZE} height={ICON_SIZE} />
      ) : (
        <IconTemp width={ICON_SIZE} height={ICON_SIZE} />
      )}
    </TouchableOpacity>
  );
}
