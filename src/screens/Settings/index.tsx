import { View } from "react-native";
import ScreenLayout from "../../components/Layout/ScreenLayout";
import SettingsCard from "../../components/Dashboard/SettingsCard";
import styles from "./style";

export default function SettingsScreen() {
  return (
    <ScreenLayout scrollable={false}>
      <View style={styles.container}>
        <SettingsCard />
      </View>
    </ScreenLayout>
  );
}
