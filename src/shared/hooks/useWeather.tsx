import React, { useEffect, useState } from "react";
import { weather } from "../interfaces/weather";

export default function useWeather() {
  const [weather, setWeather] = useState<weather | null>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(
      `
        https://api.open-meteo.com/v1/forecast?latitude=49.51&longitude=23.29&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FMoscow
        `
    )
      .then((data) => data.json())
      .then((res) => {
        setWeather(res);
        setIsLoading(false);
      });
  }, []);

  return { weather, isLoading };
}
