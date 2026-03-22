import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";
import Navigation from "./src/navigation";
import { useBluetoothStore } from "./src/store/bluetoothStore";

const App = () => {
  const connect = useBluetoothStore((s) => s.connect);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden");
    }
  }, []);

  useEffect(() => {
    connect();
  }, []);

  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
