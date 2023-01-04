import React, { useContext, useEffect, useState } from "react";
import { languageCtx } from "../context/language-context";
import { weather } from "../interfaces/weather";

export default function useWeather() {
  const [weather, setWeather] = useState<weather | null>();
  const [isLoading, setIsLoading] = useState(true);
  const {
    city: {
      value: { lat, lng },
    },
  } = useContext(languageCtx);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `
        https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FMoscow
        `
    )
      .then((data) => data.json())
      .then((res) => {
        setWeather(res);
        setIsLoading(false);
      });
  }, [lat, lng]);

  return { weather, isLoading };
}
