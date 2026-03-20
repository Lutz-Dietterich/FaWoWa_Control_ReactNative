import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Animated,
  Easing,
} from "react-native";
import styles from "./style";

const HomeScreen = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("de-DE", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setCurrentDate(now.toLocaleDateString("de-DE", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
      source={require("../../../assets/background.jpg")}
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
            <Image source={require("../../../assets/temperatur.png")} style={styles.icon} />
            <Text style={styles.dataValue}>20°C</Text>
            <Image source={require("../../../assets/wind.png")} style={styles.icon} />
            <Text style={styles.dataValue}>50%</Text>
          </View>

          <View style={styles.dataCenter}>
            <Animated.Image
              source={require("../../../assets/fan.png")}
              style={[styles.largeIcon, { transform: [{ rotate: rotation }] }]}
            />
            <Text style={styles.autoText}>AUTO</Text>
            <Image source={require("../../../assets/clock.png")} style={styles.largeIcon} />
          </View>

          <View style={styles.dataColumn}>
            <Text style={styles.dataTitle}>OUT</Text>
            <Image source={require("../../../assets/temperatur.png")} style={styles.icon} />
            <Text style={styles.dataValue}>20°C</Text>
            <Image source={require("../../../assets/wind.png")} style={styles.icon} />
            <Text style={styles.dataValue}>50%</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
