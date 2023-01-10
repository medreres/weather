import { faGlobe, faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Row, Spinner } from "react-bootstrap";
// import { drawChart24Hour } from "./shared/util/chart";
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
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  geocodeByLatLng,
  geocodeByPlaceId,
  getLatLng,
} from "react-google-places-autocomplete";
import Searchbar from "./components/Searchbar";
import Chart from "react-google-charts";
import { convertTemperatureToTable } from "./shared/util/chart";
import { createPortal } from "react-dom";

type chosenDay = {
  id: number;
  temperature: number;
  weathercode: number;
};

function App() {
  const { weather, isLoading } = useWeather();

  const [chosenDay, setChosenDay] = useState<chosenDay>();

  const { lang, city, setCity } = useContext(languageCtx);

  const [tempTable, setTempTable] = useState<[[string | number, string | number]]>();

  useEffect(() => {
    if (!chosenDay) return;

    setTempTable(convertTemperatureToTable(weather!.hourly, chosenDay.id * 24));
    // drawChart24Hour(weather!.hourly, chosenDay.id * 24);
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
      {/* <Searchbar /> */}
      {chosenDay && (
        <WeatherToday
          cityName={city.label}
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
    </>
  );
}

export default App;
