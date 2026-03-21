import { ImageBackground } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/Home";
import SettingsScreen from "../screens/Settings";
import LightsScreen from "../screens/Lights";
import AnalyticsScreen from "../screens/Analytics";

import IconHome from "../../assets/iconHome.svg";
import IconHomeOn from "../../assets/iconHomeOn.svg";
import IconSettings from "../../assets/iconSettings.svg";
import IconSettingsOn from "../../assets/iconSettingsOn.svg";
import IconLight from "../../assets/iconLight.svg";
import IconLightOn from "../../assets/iconLightOn.svg";
import colours from "../theme/colours";

const Tab = createMaterialTopTabNavigator();

const ICON_SIZE = 28;

export default function Navigation() {
  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={{ flex: 1 }}
    >
      <NavigationContainer>
      <Tab.Navigator
        tabBarPosition="bottom"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarShowLabel: false,
          tabBarIndicatorStyle: { height: 0 },
          swipeEnabled: true,
          sceneStyle: { backgroundColor: "transparent" },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <IconHomeOn width={ICON_SIZE} height={ICON_SIZE} />
              ) : (
                <IconHome width={ICON_SIZE} height={ICON_SIZE} />
              ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <IconSettingsOn width={ICON_SIZE} height={ICON_SIZE} />
              ) : (
                <IconSettings width={ICON_SIZE} height={ICON_SIZE} />
              ),
          }}
        />
        <Tab.Screen
          name="Lights"
          component={LightsScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <IconLightOn width={ICON_SIZE} height={ICON_SIZE} />
              ) : (
                <IconLight width={ICON_SIZE} height={ICON_SIZE} />
              ),
          }}
        />
        <Tab.Screen
          name="Analytics"
          component={AnalyticsScreen}
          options={{
            tabBarIcon: () => (
              <MaterialIcons
                name="bar-chart"
                size={ICON_SIZE}
                color={colours.text.primary}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    </ImageBackground>
  );
}
