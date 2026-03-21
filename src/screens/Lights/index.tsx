import { View, Text } from "react-native";
import ScreenLayout from "../../components/Layout/ScreenLayout";
import styles from "./style";

export default function LightsScreen() {
  return (
    <ScreenLayout scrollable={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Licht</Text>
      </View>
    </ScreenLayout>
  );
}
