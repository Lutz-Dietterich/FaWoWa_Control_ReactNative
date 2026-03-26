import { View, Text } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import styles from "./style";

interface SetpointDisplayProps {
  isTemp: boolean;
  isCo2?: boolean;
  value: number;
}

const RADIUS = 120;
const DASHARRAY = 725;
const MIN_OFFSET = 170;

function calculateOffset(value: number, max: number): number {
  return DASHARRAY - (value / max) * (DASHARRAY - MIN_OFFSET);
}

export default function SetpointDisplay({ isTemp, isCo2, value }: SetpointDisplayProps) {
  const max = isTemp ? 35 : isCo2 ? 2000 : 100;
  const unit = isTemp ? "°C" : isCo2 ? " ppm" : "%";
  const gradientStart = isTemp ? "#e31616" : isCo2 ? "#FFA500" : "rgb(91, 222, 70)";
  const offset = calculateOffset(value, max);

  return (
    <View style={styles.container}>
      <View style={styles.svgWrapper}>
        <Svg width="250" height="250" viewBox="0 0 300 300" style={styles.svg}>
          <Defs>
            <LinearGradient id="gaugeGradient" x1="0%" y1="70%" x2="100%" y2="80%">
              <Stop offset="0%" stopColor={gradientStart} />
              <Stop offset="100%" stopColor="rgba(255,255,255,1)" />
            </LinearGradient>
          </Defs>
          {/* Hintergrundkreis */}
          <Circle
            cx="150"
            cy="150"
            r={RADIUS}
            fill="none"
            stroke="rgba(11, 12, 13, 1)"
            strokeWidth="12"
            strokeDasharray={DASHARRAY}
            strokeDashoffset={MIN_OFFSET}
            strokeLinecap="round"
          />
          {/* Vordergrundkreis mit Farbverlauf */}
          <Circle
            cx="150"
            cy="150"
            r={RADIUS}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeDasharray={DASHARRAY}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </Svg>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>
            {value}
            <Text style={styles.unit}>{unit}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.scaleLabel}>
        <Text style={styles.labelValue}>0 {unit}</Text>
        <Text style={styles.labelValue}>{max} {unit}</Text>
      </View>
    </View>
  );
}
