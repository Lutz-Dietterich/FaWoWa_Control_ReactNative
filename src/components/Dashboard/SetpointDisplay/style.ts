import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  svgWrapper: {
    width: 250,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  svg: {
    transform: [{ rotate: "139deg" }],
  },
  valueContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontSize: 48,
    fontWeight: "300",
    color: "#FFFFFF",
  },
  unit: {
    fontSize: 16,
    fontWeight: "300",
    color: "#FFFFFF",
  },
  scaleLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 175,
    marginTop: -35,
  },
  labelValue: {
    color: "#FFFFFF",
  },
});

export default styles;
