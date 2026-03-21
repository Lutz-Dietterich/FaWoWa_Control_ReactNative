import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  label: {
    fontSize: 28,
    fontWeight: "300",
    color: "#1E1E1E",
    lineHeight: 32,
  },
});

export default styles;
