import React, { useContext, useEffect, useState } from "react";
import { appCtx } from "../../../shared/context/app-context";
import { weather } from "../interface/weather";

export default function useWeather() {
  const [weather, setWeather] = useState<weather | null>();
  const [isLoading, setIsLoading] = useState(true);
  const {
    city: {
      value: { lat, lng },
    },
    tmpUnit,
    precipUnit: precipitationUnit,
    windspeedUnit,
  } = useContext(appCtx);
  useEffect(() => {
    setIsLoading(true);
    const tempUnit = tmpUnit === "f" ? "&temperature_unit=fahrenheit" : "";
    const precipUnit = precipitationUnit === "inch" ? "&precipitation_unit=inch" : "";
    const wndUnit = windspeedUnit === "mph" ? "&windspeed_unit=mph" : "";
    // windspeed_unit=mph
    fetch(
      `
        https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}${tempUnit}${precipUnit}${wndUnit}&hourly=temperature_2m,apparent_temperature,visibility,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&current_weather=true&timezone=${Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone.split("/")
        .join("%2F")}
        `
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setWeather({
          ...res,
          updatedAt: new Date(),
        });
        setIsLoading(false);
      });
  }, [lat, lng, tmpUnit, precipitationUnit, windspeedUnit]);

  return { weather, isLoading };
}
