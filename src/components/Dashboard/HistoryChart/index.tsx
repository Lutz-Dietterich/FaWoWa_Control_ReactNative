import { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useHistoryStore, HistoryEntry } from "../../../store/historyStore";
import styles from "./style";

// ── Kurven-Konfiguration ──────────────────────────────────────────────────────

const SERIES = [
  { key: "t",  label: "Temp °C",    color: "#FF6B6B" },
  { key: "h",  label: "Feuchte %",  color: "#4ECDC4" },
  { key: "c",  label: "CO₂ ppm",    color: "#FFD93D", secondAxis: true },
  { key: "s",  label: "Lüfter %",   color: "#39FF14" },
  { key: "ta", label: "Temp aktiv", color: "#FF9F43" },
  { key: "ha", label: "Hum aktiv",  color: "#A29BFE" },
] as const;

type SeriesKey = typeof SERIES[number]["key"];

// ── Zoom-Stufen ───────────────────────────────────────────────────────────────

const ZOOM_LEVELS = [
  { label: "1h",  seconds: 3600 },
  { label: "3h",  seconds: 10800 },
  { label: "8h",  seconds: 28800 },
  { label: "24h", seconds: 86400 },
  { label: "48h", seconds: 172800 },
] as const;

const SCREEN_WIDTH = Dimensions.get("window").width - 40; // Card-Padding

// ── Hilfsfunktionen ───────────────────────────────────────────────────────────

function formatTime(ts: number): string {
  const d = new Date(ts * 1000);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function getValue(entry: HistoryEntry, key: SeriesKey): number {
  return entry[key as keyof HistoryEntry] as number;
}

// ── Komponente ────────────────────────────────────────────────────────────────

export default function HistoryChart() {
  const entries = useHistoryStore((s) => s.entries);

  const [activeSeries, setActiveSeries] = useState<Set<SeriesKey>>(
    new Set(["t", "h", "s"])
  );
  const [zoomIdx, setZoomIdx] = useState(1); // Default: 3h

  const zoomSeconds = ZOOM_LEVELS[zoomIdx].seconds;

  // Gefilterte Einträge für den Chart (alle Daten, Zoom bestimmt nur Breite des sichtbaren Fensters)
  const chartData = useMemo(() => {
    if (entries.length === 0) return null;

    // Punkte pro sichtbarem Fenster → Spacing berechnen
    const totalSpan = entries[entries.length - 1].ts - entries[0].ts;
    const pointsInWindow = Math.max(zoomSeconds / 60, 1);
    const spacing = Math.max(Math.floor(SCREEN_WIDTH / pointsInWindow), 4);

    // Eine Datenserie pro aktiver Kurve aufbauen
    const seriesData = [...activeSeries].map((key) => {
      const config = SERIES.find((s) => s.key === key)!;
      return {
        key,
        color: config.color,
        isSecondary: (config as any).secondAxis === true,
        data: entries.map((e) => ({
          value: getValue(e, key),
          label: formatTime(e.ts),
          hideDataPoint: entries.length > 200,
        })),
      };
    });

    return { seriesData, spacing, totalSpan };
  }, [entries, activeSeries, zoomSeconds]);

  const toggleSeries = (key: SeriesKey) => {
    setActiveSeries((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key); // mind. 1 aktiv
      } else {
        next.add(key);
      }
      return next;
    });
  };

  // ── Primär- und Sekundär-Daten trennen ────────────────────────────────────

  const primarySeries   = chartData?.seriesData.filter((s) => !s.isSecondary) ?? [];
  const secondarySeries = chartData?.seriesData.filter((s) => s.isSecondary)  ?? [];

  // gifted-charts erwartet: dataSet für mehrere Linien
  const primaryDataSet = primarySeries.map((s) => ({
    data: s.data,
    color: s.color,
    thickness: 2,
    hideDataPoints: entries.length > 200,
    dataPointsColor: s.color,
    curved: true,
    isSecondary: false,
  }));

  const secondaryDataSet = secondarySeries.map((s) => ({
    data: s.data,
    color: s.color,
    thickness: 2,
    hideDataPoints: entries.length > 200,
    dataPointsColor: s.color,
    curved: true,
    isSecondary: true,
  }));

  const allDataSets = [...primaryDataSet, ...secondaryDataSet];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Verlauf</Text>

      {/* Zoom-Buttons */}
      <View style={styles.zoomRow}>
        {ZOOM_LEVELS.map((z, i) => (
          <TouchableOpacity
            key={z.label}
            style={[styles.zoomBtn, i === zoomIdx && styles.zoomBtnActive]}
            onPress={() => setZoomIdx(i)}
          >
            <Text style={[styles.zoomBtnText, i === zoomIdx && styles.zoomBtnTextActive]}>
              {z.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Kurven-Toggles */}
      <View style={styles.toggleRow}>
        {SERIES.map((s) => (
          <TouchableOpacity
            key={s.key}
            style={[styles.toggleBtn, activeSeries.has(s.key) && { borderColor: s.color }]}
            onPress={() => toggleSeries(s.key)}
          >
            <View style={[styles.toggleDot, { backgroundColor: activeSeries.has(s.key) ? s.color : "#444" }]} />
            <Text style={[styles.toggleLabel, activeSeries.has(s.key) && { color: s.color }]}>
              {s.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chart */}
      {entries.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Noch keine Daten — ESP verbinden</Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartScroll}>
          <LineChart
            key={entries.length}
            dataSet={allDataSets}
            width={SCREEN_WIDTH}
            height={220}
            spacing={chartData?.spacing ?? 6}
            initialSpacing={8}
            endSpacing={8}
            backgroundColor="transparent"
            yAxisColor="rgba(255,255,255,0.15)"
            xAxisColor="rgba(255,255,255,0.15)"
            yAxisTextStyle={styles.axisText}
            xAxisLabelTextStyle={styles.axisText}
            hideRules={false}
            rulesColor="rgba(255,255,255,0.06)"
            noOfSections={5}
            showScrollIndicator={false}
            scrollToEnd={true}
            secondaryYAxis={
              secondarySeries.length > 0
                ? {
                    noOfSections: 5,
                    yAxisColor: "rgba(255,255,255,0.15)",
                    yAxisTextStyle: styles.axisTextSecondary,
                  }
                : undefined
            }
          />
        </ScrollView>
      )}

      <Text style={styles.hint}>
        {entries.length > 0
          ? `${entries.length} Messpunkte gespeichert`
          : ""}
      </Text>
    </View>
  );
}
