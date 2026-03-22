import { StyleSheet } from "react-native";
import colours from "../../../theme/colours";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(19, 19, 19, 0.80)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    maxWidth: 500,
    height: "80%",
    backgroundColor: colours.background.card,
    borderRadius: 12,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colours.text.primary,
  },
  closeButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
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
  subLabel: {
    fontSize: 13,
    color: colours.text.secondary,
    marginBottom: 8,
  },
  subLabelTop: {
    marginTop: 12,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colours.text.primary,
    fontSize: 15,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 12,
    marginTop: 16,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255,68,68,0.4)",
  },
  deleteText: {
    color: "#FF4444",
    fontSize: 14,
    fontWeight: "500",
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: colours.text.accent,
    alignItems: "center",
  },
  saveButtonDisabled: {
    opacity: 0.4,
  },
  saveText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default styles;
