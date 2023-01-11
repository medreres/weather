import { useContext, useEffect, useState } from "react";
import { languageCtx } from "./shared/context/language-context";
import Weather from "./components/Weather";
import useWeather from "./shared/hooks/useWeather";
import WeatherToday from "./components/WeatherToday";
import Navbar from "./components/Navbar";
import WeatherPlaceholder from "./components/WeatherPlaceholder";
import WeatherTodayPlaceholder from "./components/WeatherTodayPlaceholder";
import Searchbar from "./components/Searchbar";
import Chart from "react-google-charts";
import { convertTemperatureToTable } from "./shared/util/chart";
import { createPortal } from "react-dom";
import Fallback from "./components/Fallback";

type chosenDay = {
  id: number;
  temperature: number;
  weathercode: number;
};

function App() {
  const { weather, isLoading } = useWeather();

  const [chosenDay, setChosenDay] = useState<chosenDay>();

  const { lang, city } = useContext(languageCtx);

  const [tempTable, setTempTable] = useState<[[string | number, string | number]]>();

  const [outOfDate, setOutOfDate] = useState(false);

  useEffect(() => {
    if (!chosenDay) return;

    setTempTable(convertTemperatureToTable(weather!.hourly, chosenDay.id * 24));
    // drawChart24Hour(weather!.hourly, chosenDay.id * 24);
  }, [chosenDay]);

  // draw chart when weather is loaded
  useEffect(() => {
    if (isLoading) return;

    // get index of current day, keep in mind that fetch request can be cached and be old

    const now: any = new Date();
    const cacheDate: any = new Date(weather!.current_weather.time);

    const diffTime = Math.abs((now as any) - (cacheDate as any));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    console.log("diffDays", diffDays);

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

  if (outOfDate)
    return (
      <>
        <Navbar />
        <Fallback />
      </>
    );

  return (
    <>
      <Navbar />

      <Searchbar />

      {chosenDay && (
        <>
          <WeatherToday
            cityName={city.label}
            temperature={chosenDay?.temperature}
            weathercode={chosenDay?.weathercode}
            updatedAt={weather!.current_weather.time}
          />
        </>
      )}
      {isLoading && <WeatherTodayPlaceholder />}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 22vmin)",
          justifyContent: "center",
          alignItems: "center",
          gap: "2vmin",
        }}>
        {weather &&
          Array.from({ length: 7 }, (_, i) => i).map((i) => (
            <Weather
              onClick={() => {
                const id = i;
                const indexHour = id * 24 + new Date().getHours();
                setChosenDay({
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
              lang={lang}
            />
          ))}

        {isLoading && Array.from({ length: 7 }, (_, i) => i).map((i) => <WeatherPlaceholder key={i} />)}
      </div>
      {tempTable &&
        createPortal(
          <Chart
            chartType="LineChart"
            data={tempTable}
            height="400px"
            legendToggle
          />,
          document.querySelector("#curve_chart")!
        )}
      {isLoading &&
        createPortal(
          <Chart
            chartType="LineChart"
            // data={}
            height="400px"
            legendToggle
          />,
          document.querySelector("#curve_chart")!
        )}
    </>
  );
}

export default App;
