import { StyleSheet } from "react-native";
import colours from "../../../theme/colours";

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
    backgroundColor: colours.background.card,
    borderRadius: 10,
    paddingTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: colours.text.primary,
    marginBottom: 8,
  },
  gaugeButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "65%",
    marginTop: 15,
  },
  switchButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 35,
    marginBottom: 15,
  },
  tempHumButtonContainer: {
    flexDirection: "row",
    gap: 15,
  },
});

export default styles;
