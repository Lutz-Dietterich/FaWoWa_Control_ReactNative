import { StyleSheet } from "react-native";
import colours from "../../../theme/colours";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colours.background.dark,
  },
  headerContainer: {
    width: "100%",
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  flex: {
    flex: 1,
  },
});

export default styles;
