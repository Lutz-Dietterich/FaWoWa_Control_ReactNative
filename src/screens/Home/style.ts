import { StyleSheet } from "react-native";

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
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  date: {
    fontSize: 20,
    color: "white",
    marginBottom: 30,
    textShadowColor: "black",
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
    color: "white",
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  dataValue: {
    fontSize: 30,
    color: "white",
    paddingHorizontal: 10,
  },
  dataCenter: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    gap: 20,
  },
  autoText: {
    fontSize: 18,
    color: "lime",
    marginVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "white",
  },
  largeIcon: {
    width: 50,
    height: 50,
  },
});

export default styles;
