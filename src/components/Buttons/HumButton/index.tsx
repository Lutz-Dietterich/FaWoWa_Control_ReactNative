import { TouchableOpacity } from "react-native";
import IconHum from "../../../../assets/iconHum.svg";
import IconHumOn from "../../../../assets/iconHumOn.svg";
import styles from "./style";

interface HumButtonProps {
  humOn: boolean;
  onToggle: () => void;
}

const ICON_SIZE = 32;

export default function HumButton({ humOn, onToggle }: HumButtonProps) {
  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.7} style={styles.button}>
      {humOn ? (
        <IconHumOn width={ICON_SIZE} height={ICON_SIZE} />
      ) : (
        <IconHum width={ICON_SIZE} height={ICON_SIZE} />
      )}
    </TouchableOpacity>
  );
}
