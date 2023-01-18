import React, { useContext, useEffect, useState } from "react";
import { languageCtx } from "../../shared/context/app-context";
import Fallback from "./components/Fallback/Fallback";
import WeatherPlaceholder from "./components/Placeholders/WeatherPlaceholder";
import WeatherTodayPlaceholder from "./components/Placeholders/WeatherTodayPlaceholder";
import Weather from "./components/Weather";
import WeatherToday from "./components/WeatherToday";
import WeatherWeekly from "./components/WeatherWeekly";
import useWeather from "./hooks/useWeather";
import { chosenDay } from "./interface/weather";
import styles from './Weather.module.css'

export default function index() {
  const { weather, isLoading } = useWeather();
  const [outOfDate, setOutOfDate] = useState(false);
  const [chosenDay, setChosenDay] = useState<chosenDay>();
  const { city } = useContext(languageCtx);

  useEffect(() => {
    if (isLoading) return;

    // get index of current day, keep in mind that fetch request can be cached and be old

    const now: any = new Date();
    const cacheDate: any = new Date(weather!.current_weather.time);

    const diffTime = Math.abs((now as any) - (cacheDate as any));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // console.log("diffDays", diffDays);

    const id = diffDays;
    // console.log(id)
    // const id = 7;
    const indexHour = id * 24 + new Date().getHours();

    // handle if id > 6 and old request
    // if current day out of range of cached response
    if (id > 6) return setOutOfDate(true);

    if (!chosenDay)
      setChosenDay({
        id,
        temperature: weather!.hourly.temperature_2m[indexHour],
        weathercode: weather!.daily.weathercode[id],
      });
  }, [weather]);

  if (outOfDate) {
    return <Fallback />;
  }

  return (
    <>
      {chosenDay && (
        <WeatherToday
          cityName={city.label}
          temperature={chosenDay?.temperature}
          weathercode={chosenDay?.weathercode}
          updatedAt={weather!.current_weather.time}
        />
      )}

      {isLoading && <WeatherTodayPlaceholder />}

      <div className={styles['weather-container']}>
        {weather && (
          <WeatherWeekly
            weather={weather}
            onClick={setChosenDay}
            chosenDay={chosenDay}
          />
        )}

        {isLoading && Array.from({ length: 7 }, (_, i) => i).map((i) => <WeatherPlaceholder key={i} />)}
      </div>
    </>
  );
}
