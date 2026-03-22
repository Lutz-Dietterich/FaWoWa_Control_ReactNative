import { StyleSheet } from "react-native";
import colours from "../../../theme/colours";

const styles = StyleSheet.create({
  card: {
    width: 140,
    padding: 14,
    borderRadius: 8,
    backgroundColor: colours.background.card,
    marginRight: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: colours.text.primary,
    flex: 1,
    marginRight: 4,
  },
  lights: {
    gap: 6,
  },
  lightRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  lightLabel: {
    fontSize: 12,
    color: colours.text.secondary,
    width: 14,
  },
  brightnessLabel: {
    fontSize: 12,
    color: colours.text.secondary,
  },
});

export default styles;
