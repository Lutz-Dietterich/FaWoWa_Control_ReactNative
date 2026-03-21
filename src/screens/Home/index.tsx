import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, Easing } from "react-native";
import IconTemp from "../../../assets/iconTempLight.svg";
import IconHum from "../../../assets/iconHumLight.svg";
import IconFan from "../../../assets/icon-vent-status.svg";
import IconClock from "../../../assets/iconClock.svg";
import ScreenLayout from "../../components/Layout/ScreenLayout";
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
    rotateValue.setValue(0);
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateValue]);

  const rotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <ScreenLayout scrollable={false}>
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{currentTime}</Text>
          <Text style={styles.date}>{currentDate}</Text>
        </View>

        <View style={styles.dataContainer}>
          <View style={styles.dataColumn}>
            <Text style={styles.dataTitle}>IN</Text>
            <View style={styles.dataItem}>
              <IconTemp width={32} height={32} />
              <Text style={styles.dataValue}>20°C</Text>
            </View>
            <View style={styles.dataItem}>
              <IconHum width={32} height={32} />
              <Text style={styles.dataValue}>50%</Text>
            </View>
          </View>

          <View style={styles.dataCenter}>
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
              <IconFan width={50} height={50} />
            </Animated.View>
            <Text style={styles.autoText}>AUTO</Text>
            <IconClock width={50} height={50} />
          </View>

          <View style={styles.dataColumn}>
            <Text style={styles.dataTitle}>OUT</Text>
            <View style={styles.dataItem}>
              <IconTemp width={32} height={32} />
              <Text style={styles.dataValue}>20°C</Text>
            </View>
            <View style={styles.dataItem}>
              <IconHum width={32} height={32} />
              <Text style={styles.dataValue}>50%</Text>
            </View>
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default HomeScreen;
