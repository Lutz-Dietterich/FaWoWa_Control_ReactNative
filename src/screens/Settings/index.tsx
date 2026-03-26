import { View } from "react-native";
import ScreenLayout from "../../components/Layout/ScreenLayout";
import SettingsCard from "../../components/Dashboard/SettingsCard";
import { useBluetoothStore } from "../../store/bluetoothStore";
import styles from "./style";

export default function SettingsScreen() {
  const connect = useBluetoothStore((s) => s.connect);
  return (
    <ScreenLayout scrollable={true} onRefresh={connect}>
      <View style={styles.container}>
        <SettingsCard />
      </View>
    </ScreenLayout>
  );
}
