import { StyleSheet } from "react-native";
import colours from "../../../theme/colours";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(19, 19, 19, 0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    maxWidth: 500,
    backgroundColor: colours.background.card,
    borderRadius: 12,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colours.text.primary,
  },
  closeButton: {
    padding: 4,
  },
  section: {
    borderWidth: 1,
    borderColor: "#27d71c",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colours.text.primary,
    marginBottom: 12,
  },
  colorPreview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  colorCircle: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  colorLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colours.text.primary,
    fontFamily: "monospace",
  },
  quickColors: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
  },
  colorButtonActive: {
    borderWidth: 3,
    borderColor: colours.text.primary,
  },
  brightnessButtons: {
    flexDirection: "row",
    gap: 8,
  },
  brightnessButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  brightnessButtonActive: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderColor: colours.text.primary,
  },
  brightnessButtonText: {
    color: colours.text.secondary,
    fontWeight: "500",
    fontSize: 13,
  },
  brightnessButtonTextActive: {
    color: colours.text.primary,
  },
});

export default styles;
