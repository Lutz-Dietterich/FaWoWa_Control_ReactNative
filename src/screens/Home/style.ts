import { StyleSheet } from "react-native";
import colours from "../../theme/colours";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 100,
  },
  time: {
    fontSize: 64,
    color: colours.text.primary,
    textShadowColor: colours.shadow.default,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  date: {
    fontSize: 20,
    color: colours.text.primary,
    marginBottom: 30,
    textShadowColor: colours.shadow.default,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  dataContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 100,
  },
  dataColumn: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  dataTitle: {
    fontSize: 30,
    color: colours.text.primary,
    marginRight: 8,
  },
  dataItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  dataValue: {
    fontSize: 30,
    color: colours.text.primary,
    marginLeft: 6,
  },
  dataCenter: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    gap: 20,
  },
  autoText: {
    fontSize: 18,
    color: colours.text.accent,
    marginVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: colours.text.primary,
  },
  largeIcon: {
    width: 50,
    height: 50,
  },
});

export default styles;
