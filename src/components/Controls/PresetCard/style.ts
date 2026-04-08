import { StyleSheet } from "react-native";
import colours from "../../../theme/colours";

const styles = StyleSheet.create({
  card: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  cardEditMode: {
    borderColor: colours.status.warning,
  },
  cardActive: {
    borderColor: colours.text.accent,
    backgroundColor: "rgba(57,255,20,0.1)",
  },
  name: {
    fontSize: 14,
    fontWeight: "500",
    color: colours.text.primary,
  },
});

export default styles;
