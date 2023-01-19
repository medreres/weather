import React, { useContext, useEffect, useState } from "react";
import { languageCtx } from "../../../shared/context/app-context";
import { weather } from "../interface/weather";

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
        https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,apparent_temperature,visibility,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&current_weather=true&timezone=${Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone.split("/")
        .join("%2F")}
        `
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res)
        setWeather({
          ...res,
          updatedAt: new Date(),
        });
        setIsLoading(false);
      });
  }, [lat, lng]);

  return { weather, isLoading };
}
