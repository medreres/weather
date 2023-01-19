import React from "react";
import { chosenDay, weather } from "../interface/weather";
import Weather from "./WeatherCard";
interface WeatherWeeklyProps {
  weather: weather;
  onClick: React.Dispatch<React.SetStateAction<chosenDay | undefined>>;
  chosenDay: any;
}

export default function WeatherWeekly({ weather, onClick, chosenDay }: WeatherWeeklyProps) {
  return (
    <>
      {Array.from({ length: 7 }, (_, i) => i).map((i) => {
        return (
          <Weather
            onClick={() => {
              const id = i;
              const indexHour = id * 24 + new Date().getHours();
              onClick({
                id,
                weathercode: weather.daily.weathercode[id],
                temperature: weather!.hourly.temperature_2m[indexHour],
                sunrise: weather.daily.sunrise[id],
                sunset: weather.daily.sunset[id],
                windspeed_10m: weather!.hourly.windspeed_10m[indexHour],
                apparent_temperature: weather!.hourly.apparent_temperature[indexHour],
                visibility: weather!.hourly.visibility[indexHour],
                precipitation: weather.daily.precipitation_sum[id],
              });
            }}
            active={chosenDay ? chosenDay.id === i : false}
            key={i}
            time={weather.daily.time[i]}
            weathercode={weather.daily.weathercode[i]}
            temp_min={weather.daily.temperature_2m_min[i]}
            temp_max={weather.daily.temperature_2m_max[i]}
          />
        );
      })}
    </>
  );
}
