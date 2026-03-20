import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./src/screens/Home";

const App = () => {
  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
};

export default App;
