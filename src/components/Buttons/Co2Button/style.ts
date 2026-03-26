import { StyleSheet } from "react-native";
import colours from "../../../theme/colours";

const styles = StyleSheet.create({
  button: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: colours.text.secondary,
  },
  labelOn: {
    color: colours.text.accent,
  },
});

export default styles;
