import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Animated,
  Easing,
} from "react-native";

const App = () => {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const currentDate = new Date().toLocaleDateString("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = () => {
      rotateValue.setValue(0);
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };
    rotateAnimation();
  }, [rotateValue]);

  const rotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <ImageBackground
      source={require("./assets/background.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{currentTime}</Text>
          <Text style={styles.date}>{currentDate}</Text>
        </View>

        <View style={styles.dataContainer}>
          <View style={styles.dataColumn}>
            <Text style={styles.dataTitle}>IN</Text>
            <Image
              source={require("./assets/temperatur.png")}
              style={styles.icon}
            />
            <Text style={styles.dataValue}>20°C</Text>

            <Image source={require("./assets/wind.png")} style={styles.icon} />
            <Text style={styles.dataValue}>50%</Text>
          </View>

          <View style={styles.dataCenter}>
            <Animated.Image
              source={require("./assets/fan.png")}
              style={[styles.largeIcon, { transform: [{ rotate: rotation }] }]}
            />
            <Text style={styles.autoText}>AUTO</Text>
            <Image
              source={require("./assets/clock.png")}
              style={styles.largeIcon}
            />
          </View>

          <View style={styles.dataColumn}>
            <Text style={styles.dataTitle}>OUT</Text>
            <Image
              source={require("./assets/temperatur.png")}
              style={styles.icon}
            />
            <Text style={styles.dataValue}>20°C</Text>

            <Image source={require("./assets/wind.png")} style={styles.icon} />
            <Text style={styles.dataValue}>50%</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

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
  },
  date: {
    fontSize: 20,
    color: "white",
    marginBottom: 30,
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

export default App;
