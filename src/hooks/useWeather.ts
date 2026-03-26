import { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";

const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
const INTERVAL_MS = 5 * 60 * 1000;

interface WeatherData {
  temperature: number | null;
  humidity: number | null;
  locationName: string | null;
}

export function useWeather(): WeatherData {
  const [data, setData] = useState<WeatherData>({ temperature: null, humidity: null, locationName: null });
  const locationRef = useRef<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    let stopped = false;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let locationSub: Location.LocationSubscription | null = null;

    async function fetchWeather() {
      const loc = locationRef.current;
      console.log("[Weather] fetchWeather loc:", loc, "apiKey:", API_KEY ? "vorhanden" : "FEHLT");
      if (!loc || !API_KEY) return;
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${loc.latitude}&lon=${loc.longitude}&units=metric&appid=${API_KEY}`;
        const res = await fetch(url);
        const json = await res.json();
        console.log("[Weather] API response:", JSON.stringify(json));
        if (!stopped && json.main) {
          setData({
            temperature: Math.round(json.main.temp),
            humidity: Math.round(json.main.humidity),
            locationName: json.name ?? null,
          });
        }
      } catch (e) {
        console.error("[Weather] fetch Fehler:", e);
      }
    }

    async function start() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("[Weather] Location permission:", status);
      if (status !== "granted" || stopped) return;

      try {
        const initial = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
        locationRef.current = { latitude: initial.coords.latitude, longitude: initial.coords.longitude };
        console.log("[Weather] initial location:", locationRef.current);
      } catch (e) {
        console.error("[Weather] getCurrentPosition Fehler:", e);
        return;
      }
      fetchWeather();

      locationSub = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Low, distanceInterval: 500 },
        (loc) => {
          locationRef.current = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };
        }
      );

      intervalId = setInterval(fetchWeather, INTERVAL_MS);
    }

    start();

    return () => {
      stopped = true;
      locationSub?.remove();
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return data;
}
