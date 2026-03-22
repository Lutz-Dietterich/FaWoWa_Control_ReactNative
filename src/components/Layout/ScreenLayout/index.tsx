import { View, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Header";
import styles from "./style";

interface ScreenLayoutProps {
  children: React.ReactNode;
  scrollable?: boolean;
  onRefresh?: () => void;
}

export default function ScreenLayout({ children, scrollable = true, onRefresh }: ScreenLayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <ScrollView
        style={styles.scrollView}
        scrollEnabled={scrollable}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={false} onRefresh={onRefresh} tintColor="#ffffff" />
          ) : undefined
        }
      >
        <View style={scrollable ? styles.container : [styles.container, styles.flex]}>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
