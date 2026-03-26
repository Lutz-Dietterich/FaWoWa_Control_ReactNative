const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  expo: {
    name: IS_DEV ? "FaWoWa Control.dev" : "FaWoWa Control",
    slug: "FaWoWa-Control_reactNative",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      permissions: [
        "android.permission.BLUETOOTH",
        "android.permission.BLUETOOTH_ADMIN",
        "android.permission.BLUETOOTH_CONNECT",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_COARSE_LOCATION",
      ],
      package: IS_DEV
        ? "com.lutz_dietterich.FaWoWaControl.dev"
        : "com.lutz_dietterich.FaWoWaControl",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: ["expo-asset", "react-native-ble-plx", "expo-location"],
    extra: {
      eas: {
        projectId: "9c3cc1a7-48d8-4e60-b55f-ec3662e96319",
      },
    },
  },
};
