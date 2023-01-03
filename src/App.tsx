import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { Container, Dropdown, Navbar } from "react-bootstrap";
import { drawChart24Hour } from "./shared/util/chart";
import { LANGUAGES, TRANSLATION } from "./shared/translation";
import { languageCtx } from "./shared/context/language-context";
import useLanguage from "./shared/hooks/useLanguage";
import Weather from "./components/Weather";
import useWeather from "./shared/hooks/useWeather";
import WeatherToday from "./components/WeatherToday";

function App() {
  const { weather, isLoading } = useWeather();

  const { lang, setLanguage } = useContext(languageCtx);

  const translate = useLanguage();

  useEffect(() => {
    if (isLoading) return;

    drawChart24Hour(weather!.hourly);
  }, [weather]);
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand>Weather</Navbar.Brand>
          <Dropdown align="end">
            <Dropdown.Toggle>
              <FontAwesomeIcon icon={faGlobe} />{" "}
              {translate(TRANSLATION.LANGUAGE)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header>
                {translate(TRANSLATION.INTERFACE_LANGUAGE)}
              </Dropdown.Header>
              <Dropdown.Divider />
              {Object.keys(LANGUAGES).map((option) => (
                <Dropdown.Item
                  disabled={option === lang}
                  key={option}
                  onClick={() => {
                    setLanguage(option);
                  }}
                >
                  {LANGUAGES[option]}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
      {weather && (
        <WeatherToday
          temperature={weather.current_weather.temperature}
          weathercode={weather.current_weather.weathercode}
        />
      )}
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
              key={i}
              time={weather.daily.time[i]}
              weathercode={weather.daily.weathercode[i]}
              temp_min={weather.daily.temperature_2m_min[i]}
              temp_max={weather.daily.temperature_2m_max[i]}
              lang={lang}
            />
          ))}
      </div>
    </>
  );
}

export default App;
