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
    // Europe%2FKiev
    console.log()
    fetch(
      `
        https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone.split('/').join('%2F')}
        `
    )
      .then((response) => {
        // console.log(response.headers.get('Date'))
        return response.json();
      })
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
