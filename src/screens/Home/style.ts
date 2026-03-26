import { StyleSheet } from "react-native";
import colours from "../../theme/colours";

const styles = StyleSheet.create({
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
  co2Row: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginTop: 10,
    gap: 8,
  },
  co2Value: {
    fontSize: 30,
    color: colours.text.primary,
    textShadowColor: colours.shadow.default,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  co2Unit: {
    fontSize: 18,
    color: colours.text.secondary,
  },
  outBlock: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  outDataRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationName: {
    fontSize: 14,
    color: colours.text.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colours.text.primary,
    marginBottom: 16,
  },
  modalPlaceholder: {
    fontSize: 14,
    color: colours.text.secondary,
    textAlign: "center",
    paddingVertical: 20,
  },
});

export default styles;
