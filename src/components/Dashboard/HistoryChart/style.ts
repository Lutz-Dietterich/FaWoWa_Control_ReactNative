import { StyleSheet } from "react-native";
import colours from "../../../theme/colours";

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: colours.background.card,
    borderRadius: 10,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colours.text.secondary,
    marginBottom: 12,
  },

  // ── Zoom ──────────────────────────────────────────────────────────────────
  zoomRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 12,
  },
  zoomBtn: {
    flex: 1,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
  },
  zoomBtnActive: {
    borderColor: colours.text.accent,
    backgroundColor: "rgba(57,255,20,0.1)",
  },
  zoomBtnText: {
    fontSize: 12,
    color: colours.text.secondary,
  },
  zoomBtnTextActive: {
    color: colours.text.accent,
    fontWeight: "600",
  },

  // ── Kurven-Toggles ────────────────────────────────────────────────────────
  toggleRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 14,
  },
  toggleBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  toggleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  toggleLabel: {
    fontSize: 11,
    color: colours.text.secondary,
  },

  // ── Chart ─────────────────────────────────────────────────────────────────
  chartScroll: {
    marginHorizontal: -4,
  },
  axisText: {
    fontSize: 9,
    color: "rgba(255,255,255,0.4)",
  },
  axisTextSecondary: {
    fontSize: 9,
    color: "rgba(255,211,61,0.5)",
  },

  // ── Leer-Zustand ──────────────────────────────────────────────────────────
  empty: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: colours.text.secondary,
    fontSize: 13,
  },

  hint: {
    fontSize: 10,
    color: "rgba(255,255,255,0.25)",
    textAlign: "right",
    marginTop: 8,
  },
});

export default styles;
