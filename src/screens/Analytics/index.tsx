import { View } from "react-native";
import ScreenLayout from "../../components/Layout/ScreenLayout";
import FanStatusCard from "../../components/Dashboard/FanStatusCard";
import FanFineSettingsCard from "../../components/Dashboard/FanFineSettingsCard";
import { useBluetoothStore } from "../../store/bluetoothStore";
import styles from "./style";

export default function AnalyticsScreen() {
  const connect = useBluetoothStore((s) => s.connect);
  return (
    <ScreenLayout scrollable={true} onRefresh={connect}>
      <View style={styles.container}>
        <FanStatusCard />
        <FanFineSettingsCard />
      </View>
    </ScreenLayout>
  );
}
