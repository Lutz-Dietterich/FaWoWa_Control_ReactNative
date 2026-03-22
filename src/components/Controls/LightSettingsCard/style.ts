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
});

export default styles;
