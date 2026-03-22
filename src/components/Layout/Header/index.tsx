import { View } from "react-native";
import { useBluetoothStore } from "../../../store/bluetoothStore";
import styles from "./style";

export default function Header() {
  const connectionState = useBluetoothStore((s) => s.connectionState);

  const dotColor =
    connectionState === "connected"  ? "#39FF14" :
    connectionState === "scanning" || connectionState === "connecting" ? "#FFA500" :
    "#FF3B30";

  return (
    <View style={styles.container}>
      <View style={[styles.dot, { backgroundColor: dotColor }]} />
    </View>
  );
}
