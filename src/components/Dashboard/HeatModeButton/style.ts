import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  activeContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  countdown: {
    fontSize: 18,
    color: "#39FF14",
    fontVariant: ["tabular-nums"],
  },
});

export default styles;
