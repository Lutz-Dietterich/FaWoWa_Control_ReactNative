import { View } from "react-native";
import ScreenLayout from "../../components/Layout/ScreenLayout";
import LightCard from "../../components/Controls/LightCard";
import styles from "./style";

export default function LightsScreen() {
  return (
    <ScreenLayout scrollable={true}>
      <View style={styles.grid}>
        <LightCard title="Alle Lampen" />
        <LightCard title="Raum" />
        <LightCard title="Fach" />
        <LightCard title="Alfred" />
      </View>
    </ScreenLayout>
  );
}
