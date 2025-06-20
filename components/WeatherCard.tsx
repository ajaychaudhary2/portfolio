// src/components/WeatherCard.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

type Weather = {
  temp: number;
  desc: string;
  humidity: number;
  wind: number;
  icon: string;
  city: string;
};

const WeatherCard = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async pos => {
      try {
        const { latitude, longitude } = pos.coords;
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              lat: latitude,
              lon: longitude,
              units: "metric",
              appid: process.env.NEXT_PUBLIC_WEATHER_KEY
            }
          }
        );
        const d = res.data;
        setWeather({
          temp: Math.round(d.main.temp),
          desc: d.weather[0].description,
          humidity: d.main.humidity,
          wind: Math.round(d.wind.speed * 3.6), // m/s → km/h
          icon: `http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`,
          city: d.name
        });
      } catch (e) {
        setError("Weather fetch failed");
      }
    }, () => setError("Location permission denied"));
  }, []);

  if (error) return <div className="text-red-400">{error}</div>;
  if (!weather) return <div className="text-gray-400">Loading...</div>;

  return (
    <div className="bg-gradient-to-br from-[#11172a] via-[#1b223a] to-[#11172a]
        p-4 rounded-2xl shadow-lg shadow-[#0d0f1d]/70 w-64 text-white">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-lg font-semibold text-purple">🌤 Weather</h2>
          <p className="text-xs text-gray-400">{weather.city}</p>
        </div>
        <img src={weather.icon} alt="icon" className="w-12 h-12"/>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="text-3xl font-bold">{weather.temp}°C</div>
        <div className="text-right text-xs text-gray-400">
          <div className="capitalize">{weather.desc}</div>
          <div>Humidity: {weather.humidity}%</div>
          <div>Wind: {weather.wind} km/h</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
