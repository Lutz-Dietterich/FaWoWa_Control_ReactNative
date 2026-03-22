import { StyleSheet } from "react-native";
import colours from "../../../theme/colours";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  buttonActive: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderColor: colours.text.accent,
  },
  text: {
    color: colours.text.secondary,
    fontWeight: "500",
    fontSize: 13,
  },
  textActive: {
    color: colours.text.primary,
  },
});

export default styles;
