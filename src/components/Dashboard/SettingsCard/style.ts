import { StyleSheet } from "react-native";
import colours from "../../../theme/colours";

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        width: "100%",
        maxWidth: 400,
        backgroundColor: colours.background.card,
        borderRadius: 10,
        paddingTop: 30,
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
    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    modalCard: {
        width: "100%",
        backgroundColor: "#1a1a1a",
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: colours.text.primary,
        marginBottom: 20,
    },
    modalDivider: {
        height: 1,
        backgroundColor: "rgba(255,255,255,0.08)",
        marginVertical: 14,
    },
    offsetRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    offsetLabel: {
        fontSize: 14,
        color: colours.text.primary,
        flex: 1,
    },
    offsetControls: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    offsetValue: {
        fontSize: 14,
        color: colours.text.primary,
        minWidth: 120,
        textAlign: "center",
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
