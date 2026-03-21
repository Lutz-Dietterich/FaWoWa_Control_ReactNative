import { StyleSheet } from "react-native";
import colours from "../../theme/colours";

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    color: colours.text.primary,
    textShadowColor: colours.shadow.default,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
});

export default styles;
