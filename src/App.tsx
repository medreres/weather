import { CssStyleClass } from "@fortawesome/fontawesome-svg-core";
import {
  faChartPie,
  faCoffee,
  faDownLeftAndUpRightToCenter,
  faGolfBall,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useEffect, useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { getDescription, getIcon } from "../weatherCode";
import { drawChart24Hour } from "./shared/util/chart";
import { getDay, normalizeTemp } from "./shared/util/formatting";
import { Weather } from "./shared/util/interfaces/weather";


function App() {
  const [weather, setWeather] = useState<Weather | null>();
  useEffect(() => {
    fetch(
      `
      https://api.open-meteo.com/v1/forecast?latitude=49.51&longitude=23.29&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FMoscow
      `
    )
      .then((data) => data.json())
      .then((res) => {
        setWeather(res);
      });
  }, []);

  // console.log(weather);

  if (weather) {
    drawChart24Hour(weather.hourly)
  }
  return (
    <>
      {weather && (
        <div className="w-100 text-center">
          <h1>Kulchytsi</h1>
          <h2
            style={{
              fontSize: "13vmin",
            }}
          >
            <FontAwesomeIcon
              // size="8x"
              icon={getIcon(weather.current_weather.weathercode)}
            />{" "}
            {normalizeTemp(weather.current_weather.temperature)}˚C
          </h2>
          <h5>{getDescription(weather.current_weather.weathercode)}</h5>
        </div>
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
          Array.from({ length: 7 }, (_, i) => i).map((i) => {
            if (i == 0) return;

            return (
              <Card
                key={i}
                style={{
                  width: "20vmin",
                  margin: "1vmin",
                  fontSize: "3vmin",
                  minWidth: "22vmin",
                }}
              >
                <Card.Body>
                  <Card.Title
                    style={{
                      fontSize: "2.5vmin",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    {getDay(weather.daily.time[i])},{" "}
                    {new Date(weather.daily.time[i]).getDate()}
                  </Card.Title>
                  <FontAwesomeIcon
                    size="2x"
                    icon={getIcon(weather.daily.weathercode[i])}
                  />
                  <Card.Text>
                    <span
                      style={{
                        fontSize: "8vmin",
                        letterSpacing: "-5px",
                      }}
                    >
                      {normalizeTemp(weather.daily.temperature_2m_min[i])}˚
                    </span>
                    <span
                      style={{
                        fontSize: "4vmin",
                        letterSpacing: "-2px",
                      }}
                    >
                      {normalizeTemp(weather.daily.temperature_2m_max[i])}˚
                    </span>
                    <br />
                    <span
                      style={{
                        fontSize: "1.3vmin",
                        lineHeight: "1.5vmin",
                        display: "inline-block",
                      }}
                    >
                      {getDescription(weather.daily.weathercode[i])}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </>
  );
}

export default App;
