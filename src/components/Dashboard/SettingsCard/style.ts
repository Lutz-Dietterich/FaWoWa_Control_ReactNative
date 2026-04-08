import { StyleSheet } from "react-native";
import colours from "../../../theme/colours";

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        width: "100%",
        maxWidth: 400,
        backgroundColor: colours.background.card,
        borderRadius: 10,
        paddingTop: 56,
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        color: colours.text.primary,
        marginBottom: 8,
    },
    gearBtn: {
        position: "absolute",
        top: 14,
        right: 14,
        padding: 4,
    },
    gaugeButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "65%",
        marginTop: 15,
    },
    switchButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        marginTop: 35,
        marginBottom: 15,
    },
    tempHumButtonContainer: {
        flexDirection: "row",
        gap: 10,
    },
    manualSpeedControl: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    manualSpeedValue: {
        fontSize: 16,
        color: colours.text.primary,
        minWidth: 48,
        textAlign: "center",
    },
    manualSpeedBtn: {
        width: 32,
        height: 32,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
    manualSpeedBtnText: {
        fontSize: 18,
        color: colours.text.primary,
        lineHeight: 20,
    },
    // Fan-Selektor
    fanSelector: {
        position: "absolute",
        top: 14,
        left: 14,
        flexDirection: "row",
        gap: 6,
    },
    hiddenBtn: {
        opacity: 0,
        pointerEvents: "none",
    },
    fanTab: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.15)",
    },
    fanTabActive: {
        borderColor: colours.text.accent,
        backgroundColor: "rgba(57,255,20,0.1)",
    },
    fanTabText: {
        fontSize: 12,
        color: colours.text.secondary,
    },
    fanTabTextActive: {
        color: colours.text.accent,
        fontWeight: "600",
    },
    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10,
    },
    modalCard: {
        width: "100%",
        backgroundColor: "#1a1a1a",
        borderRadius: 12,
        padding: 20,
        marginTop: 60,
        maxHeight: "80%",
    },
    modalCloseBtn: {
        position: "absolute",
        top: 14,
        right: 14,
        padding: 4,
        zIndex: 1,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: colours.text.primary,
        marginBottom: 20,
        paddingRight: 32,
    },
    modalDivider: {
        height: 1,
        backgroundColor: "rgba(255,255,255,0.08)",
        marginVertical: 14,
    },
    modalSectionLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: colours.text.accent,
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: 0.8,
    },
    offsetRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },
    offsetLabel: {
        fontSize: 13,
        color: colours.text.secondary,
        flex: 1,
        marginRight: 8,
    },
    offsetControls: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    offsetValue: {
        fontSize: 14,
        color: colours.text.primary,
        width: 52,
        textAlign: "center",
        fontVariant: ["tabular-nums"],
    },
    offsetBtn: {
        width: 32,
        height: 32,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
    offsetBtnText: {
        fontSize: 18,
        color: colours.text.primary,
        lineHeight: 20,
    },
    calibrateBtn: {
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
    },
    calibrateBtnText: {
        fontSize: 14,
        color: colours.text.primary,
        fontWeight: "500",
    },
});

export default styles;
