import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Header";
import styles from "./style";

interface ScreenLayoutProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export default function ScreenLayout({ children, scrollable = true }: ScreenLayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      {scrollable ? (
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>{children}</View>
        </ScrollView>
      ) : (
        <View style={[styles.container, styles.flex]}>{children}</View>
      )}
    </SafeAreaView>
  );
}
