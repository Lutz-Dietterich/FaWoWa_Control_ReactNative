import { View } from "react-native";
import ScreenLayout from "../../components/Layout/ScreenLayout";
import LightCard from "../../components/Controls/LightCard";
import styles from "./style";

export default function LightsScreen() {
  return (
    <ScreenLayout scrollable={true}>
      <View style={styles.grid}>
        <LightCard title="Alle Lampen" id="alle" />
        <LightCard title="Raum" id="raum" />
        <LightCard title="Fach" id="fach" />
        <LightCard title="Alfred" id="alfred" />
      </View>
    </ScreenLayout>
  );
}
