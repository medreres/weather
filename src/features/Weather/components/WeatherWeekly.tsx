import React from "react";
import { chosenDay, weather } from "../interface/weather";
import Weather from "./Weather";
interface WeatherWeeklyProps {
  weather: weather;
  onClick: React.Dispatch<React.SetStateAction<chosenDay | undefined>>;
  chosenDay: any;
}

export default function WeatherWeekly({ weather, onClick, chosenDay }: WeatherWeeklyProps) {
  return (
    <>
      {Array.from({ length: 7 }, (_, i) => i).map((i) => (
        <Weather
          onClick={() => {
            const id = i;
            const indexHour = id * 24 + new Date().getHours();
            onClick({
              id,
              weathercode: weather.daily.weathercode[id],
              temperature: weather!.hourly.temperature_2m[indexHour],
            });
          }}
          active={chosenDay ? chosenDay.id === i : false}
          key={i}
          time={weather.daily.time[i]}
          weathercode={weather.daily.weathercode[i]}
          temp_min={weather.daily.temperature_2m_min[i]}
          temp_max={weather.daily.temperature_2m_max[i]}
        />
      ))}
    </>
  );
}
