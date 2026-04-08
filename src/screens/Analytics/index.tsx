import { View } from "react-native";
import ScreenLayout from "../../components/Layout/ScreenLayout";
import FanStatusCard from "../../components/Dashboard/FanStatusCard";
import Slave1StatusCard from "../../components/Dashboard/Slave1StatusCard";
import HistoryChart from "../../components/Dashboard/HistoryChart";
import { useBluetoothStore } from "../../store/bluetoothStore";
import styles from "./style";

export default function AnalyticsScreen() {
  const connect = useBluetoothStore((s) => s.connect);
  return (
    <ScreenLayout scrollable={true} onRefresh={connect}>
      <View style={styles.container}>
        <FanStatusCard />
        <Slave1StatusCard />
        <HistoryChart />
      </View>
    </ScreenLayout>
  );
}
