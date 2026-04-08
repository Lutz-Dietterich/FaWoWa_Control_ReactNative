import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, Easing, Modal, TouchableOpacity } from "react-native";
import { useBluetoothStore } from "../../store/bluetoothStore";
import IconTemp from "../../../assets/iconTempLight.svg";
import IconHum from "../../../assets/iconHumLight.svg";
import IconFan from "../../../assets/icon-vent-status.svg";
import IconClock from "../../../assets/iconClock.svg";
import ScreenLayout from "../../components/Layout/ScreenLayout";
import { useSensorStore } from "../../store/sensorStore";
import { useFanStore } from "../../store/fanStore";
import { useWeather } from "../../hooks/useWeather";
import HeatModeButton from "../../components/Dashboard/HeatModeButton";
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

  const fan1Speed = useFanStore((s) => s.fan1Speed);
  const speedRef = useRef(fan1Speed);
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    speedRef.current = fan1Speed;
  }, [fan1Speed]);

  useEffect(() => {
    let stopped = false;

    const step = () => {
      if (stopped) return;
      const speed = speedRef.current;
      if (speed <= 0) {
        setTimeout(step, 200);
        return;
      }
      rotateValue.setValue(0);
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 50000 / speed,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished && !stopped) step();
      });
    };

    step();
    return () => { stopped = true; };
  }, []);

  const rotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const weather = useWeather();
  const connect = useBluetoothStore((s) => s.connect);
  const temperature = useSensorStore((s) => s.temperature);
  const humidity = useSensorStore((s) => s.humidity);
  const co2 = useSensorStore((s) => s.co2);
  const autoMode = useFanStore((s) => s.autoMode);
  const [clockModalVisible, setClockModalVisible] = useState(false);
  const formatTemp = (val: number | null) => (val !== null ? `${val}°C` : "--");
  const formatHum = (val: number | null) => (val !== null ? `${val}%` : "--");

  return (
    <ScreenLayout scrollable={false} onRefresh={connect}>
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{currentTime}</Text>
          <Text style={styles.date}>{currentDate}</Text>
        </View>

        <View style={styles.dataContainer}>
          <View style={styles.outBlock}>
            {weather.locationName && (
              <Text style={styles.locationName}>{weather.locationName}</Text>
            )}
            <View style={styles.outDataRow}>
              <Text style={styles.dataTitle}>OUT</Text>
              <View style={styles.dataItem}>
                <IconTemp width={32} height={32} />
                <Text style={styles.dataValue}>{formatTemp(weather.temperature)}</Text>
              </View>
              <View style={styles.dataItem}>
                <IconHum width={32} height={32} />
                <Text style={styles.dataValue}>{formatHum(weather.humidity)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.dataCenter}>
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
              <IconFan width={50} height={50} />
            </Animated.View>
            <Text style={styles.autoText}>{autoMode ? "AUTO" : "MANUELL"}</Text>
            <TouchableOpacity onPress={() => setClockModalVisible(true)}>
              <IconClock width={50} height={50} />
            </TouchableOpacity>
          </View>

          <View style={styles.dataColumn}>
            <Text style={styles.dataTitle}>IN</Text>
            <View style={styles.dataItem}>
              <IconTemp width={32} height={32} />
              <Text style={styles.dataValue}>{formatTemp(temperature)}</Text>
            </View>
            <View style={styles.dataItem}>
              <IconHum width={32} height={32} />
              <Text style={styles.dataValue}>{formatHum(humidity)}</Text>
            </View>
          </View>

          <View style={styles.co2Row}>
            <Text style={styles.co2Value}>{co2 ?? "--"}</Text>
            <Text style={styles.co2Unit}>ppm CO₂</Text>
            <HeatModeButton />
          </View>
        </View>
      </View>
      <Modal visible={clockModalVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setClockModalVisible(false)}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Nachtabsenkung</Text>
            <Text style={styles.modalPlaceholder}>Noch nicht implementiert</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScreenLayout>
  );
};

export default HomeScreen;
