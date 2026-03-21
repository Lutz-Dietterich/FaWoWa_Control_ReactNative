import { View, Text, ImageBackground } from "react-native";
import styles from "./style";

export default function SettingsScreen() {
  return (
    <ImageBackground
      source={require("../../../assets/background.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Einstellungen</Text>
      </View>
    </ImageBackground>
  );
}
