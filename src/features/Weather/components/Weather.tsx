import React, { useContext, useEffect, useState } from "react";
import { appCtx } from "../../../shared/context/app-context";
import Fallback from "./Fallback/Fallback";
import WeatherPlaceholder from "./Placeholders/WeatherPlaceholder";
import WeatherTodayPlaceholder from "./Placeholders/WeatherTodayPlaceholder";
import Weather from "./WeatherCard";
import WeatherToday from "./WeatherToday";
import WeatherWeekly from "./WeatherWeekly";
import useWeather from "../hooks/useWeather";
import { chosenDay } from "../interface/weather";
import styles from "./Weather.module.css";

export default function index() {
  const { weather, isLoading } = useWeather();
  const [outOfDate, setOutOfDate] = useState(false);
  const [chosenDay, setChosenDay] = useState<chosenDay>();
  const { city, tmpUnit, precipUnit, windspeedUnit } = useContext(appCtx);

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

    setChosenDay({
      id,
      temperature: weather!.hourly.temperature_2m[indexHour],
      weathercode: weather!.daily.weathercode[id],
      sunrise: weather!.daily.sunrise[id],
      sunset: weather!.daily.sunset[id],
      windspeed_10m: weather!.hourly.windspeed_10m[indexHour],
      apparent_temperature: weather!.hourly.apparent_temperature[indexHour],
      visibility: weather!.hourly.visibility[indexHour],
      precipitation: weather!.daily.precipitation_sum[id],
    });
  }, [weather, tmpUnit, precipUnit, windspeedUnit, isLoading]);

  if (outOfDate) {
    return <Fallback />;
  }

  return (
    <>
      {isLoading == false && chosenDay && (
        <WeatherToday
          cityName={city.label}
          temperature={chosenDay?.temperature}
          weathercode={chosenDay?.weathercode}
          sunrise={chosenDay?.sunrise}
          sunset={chosenDay?.sunset}
          updatedAt={weather!.current_weather.time}
          windspeed_10m={chosenDay.windspeed_10m}
          visibility={chosenDay.visibility}
          apparent_temperature={chosenDay.apparent_temperature}
          precipitation={chosenDay.precipitation}
        />
      )}

      {isLoading && <WeatherTodayPlaceholder />}

      <div className={styles["weather-container"]}>
        {isLoading === false && weather && (
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
