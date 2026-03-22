import { View } from "react-native";
import ScreenLayout from "../../components/Layout/ScreenLayout";
import LightCard from "../../components/Controls/LightCard";
import PresetsSection from "../../components/Controls/PresetsSection";
import { useBluetoothStore } from "../../store/bluetoothStore";
import styles from "./style";

export default function LightsScreen() {
  const connect = useBluetoothStore((s) => s.connect);
  return (
    <ScreenLayout scrollable={true} onRefresh={connect}>
      <PresetsSection />
      <View style={styles.grid}>
        <LightCard title="Alle Lampen" id="alle" />
        <LightCard title="Raum" id="raum" />
        <LightCard title="Fach" id="fach" />
        <LightCard title="Alfred" id="alfred" />
      </View>
    </ScreenLayout>
  );
}
