import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import { drawChart24Hour } from "./shared/util/chart";
import { LANGUAGES, TRANSLATION } from "./shared/translation";
import { languageCtx } from "./shared/context/language-context";
import useLanguage from "./shared/hooks/useLanguage";
import Weather from "./components/Weather";
import useWeather from "./shared/hooks/useWeather";
import WeatherToday from "./components/WeatherToday";
import Navbar from "./components/Navbar";
import WeatherPlaceholder from "./components/WeatherPlaceholder";
import WeatherTodayPlaceholder from "./components/WeatherTodayPlaceholder";
import { hourly } from "./shared/interfaces/weather";

type chosenDay = {
  id: number;
  temperature: number;
  weathercode: number;
};

function App() {
  const { weather, isLoading } = useWeather();

  const [chosenDay, setChosenDay] = useState<chosenDay>();

  const { lang } = useContext(languageCtx);

  useEffect(() => {
    if (!chosenDay) return;

    drawChart24Hour(weather!.hourly, chosenDay.id * 24);
  }, [chosenDay]);

  // draw chart when weather is loaded
  useEffect(() => {
    if (isLoading) return;

    const id = 0;
    const indexHour = id * 24 + new Date().getHours();

    if (!chosenDay)
      setChosenDay({
        id: 0,
        temperature: weather!.hourly.temperature_2m[indexHour],
        weathercode: weather!.daily.weathercode[id],
      });
  }, [weather]);

  return (
    <>
      <Navbar />
      {chosenDay && (
        <WeatherToday
          temperature={chosenDay?.temperature}
          weathercode={chosenDay?.weathercode}
        />
      )}
      {isLoading && <WeatherTodayPlaceholder />}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 22vmin)",
          justifyContent: "center",
          alignItems: "center",
          gap: "2vmin",
        }}
      >
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
        {isLoading &&
          Array.from({ length: 7 }, (_, i) => i).map((i) => (
            <WeatherPlaceholder key={i} />
          ))}
      </div>
    </>
  );
}

export default App;
