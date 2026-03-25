import { StyleSheet } from "react-native";
import colours from "../../../theme/colours";

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: colours.background.card,
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colours.text.secondary,
    marginBottom: 16,
  },
  speedRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
    marginBottom: 16,
  },
  speedValue: {
    fontSize: 42,
    fontWeight: "700",
    color: colours.text.accent,
  },
  speedLabel: {
    fontSize: 14,
    color: colours.text.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: 14,
  },
  modeRow: {
    gap: 10,
  },
  modeItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  modeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotActive: {
    backgroundColor: colours.status.active,
  },
  dotInactive: {
    backgroundColor: colours.status.inactive,
  },
  modeLabel: {
    fontSize: 14,
    color: colours.text.primary,
  },
  sensorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sensorItem: {
    alignItems: "center",
  },
  sensorValue: {
    fontSize: 18,
    fontWeight: "600",
    color: colours.text.primary,
  },
  sensorLabel: {
    fontSize: 12,
    color: colours.text.secondary,
    marginTop: 2,
  },
});

export default styles;
