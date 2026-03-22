import { View, Text } from "react-native";
import ScreenLayout from "../../components/Layout/ScreenLayout";
import { useBluetoothStore } from "../../store/bluetoothStore";
import styles from "./style";

export default function AnalyticsScreen() {
  const connect = useBluetoothStore((s) => s.connect);
  return (
    <ScreenLayout scrollable={false} onRefresh={connect}>
      <View style={styles.container}>
        <Text style={styles.title}>Auswertung</Text>
      </View>
    </ScreenLayout>
  );
}
