import { View, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";

interface ScreenLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  scrollable?: boolean;
}

export default function ScreenLayout({ children, header, scrollable = true }: ScreenLayoutProps) {
  return (
    <ImageBackground
      source={require("../../../../assets/background.jpg")}
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        {header && <View style={styles.headerContainer}>{header}</View>}
        {scrollable ? (
          <ScrollView style={styles.scrollView}>
            <View style={styles.container}>{children}</View>
          </ScrollView>
        ) : (
          <View style={[styles.container, styles.flex]}>{children}</View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}
