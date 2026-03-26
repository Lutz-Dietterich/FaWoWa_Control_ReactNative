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
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colours.text.accent,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  rowLabel: {
    fontSize: 14,
    color: colours.text.primary,
    flex: 1,
  },
  rowControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowValue: {
    fontSize: 14,
    color: colours.text.primary,
    minWidth: 110,
    textAlign: "center",
  },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  stepBtnText: {
    fontSize: 18,
    color: colours.text.primary,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: 14,
  },
});

export default styles;
