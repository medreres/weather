import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { getIcon, getDescription } from "../utils/weatherCode";
import { languageCtx } from "../../../shared/context/app-context";
import useLanguage from "../../../shared/hooks/useTranslation";
import { TRANSLATION } from "../../../shared/lang/translation";
import { getTime, normalizeTemp } from "../utils/formatting";
import styles from "./WeatherToday.module.css";
import { Col, Container, Row } from "react-bootstrap";

type WeatherTodayProps = {
  weathercode: number;
  temperature: number;
  cityName: string;
  updatedAt: string;
  sunrise: string;
  sunset: string;
  windspeed_10m: number;
  visibility: number;
  apparent_temperature: number;
  precipitation: number;
};

export default function WeatherToday({
  weathercode,
  temperature,
  cityName,
  updatedAt,
  sunrise,
  sunset,
  windspeed_10m,
  apparent_temperature,
  visibility,
  precipitation,
}: WeatherTodayProps) {
  const translate = useLanguage();
  const { lang } = useContext(languageCtx);

  // TODO add precipitation, sunrise, sunset, windspeed, apparent temperature

  return (
    <div className={styles["weather-today"]}>
      <h1>{cityName}</h1>
      <h2
        style={{
          fontSize: "13vmin",
        }}>
        <FontAwesomeIcon icon={getIcon(weathercode)} /> {normalizeTemp(temperature)}˚C
      </h2>
      <h5>{translate(getDescription(weathercode))}</h5>
      <Container className="ps-4 pe-4 pt-3">
        <Row className="justify-content-around">
          <Col>
            <p className="text-start">Feels like: {apparent_temperature}</p>
          </Col>
          <Col>
            <p className="text-end">Windspeed: {windspeed_10m}</p>
          </Col>
        </Row>
        <Row className="justify-content-around">
          <Col>
            <p className="text-start">Sunrise: {getTime(sunrise, lang)}</p>
          </Col>
          <Col>
            <p className="text-end">Sunset: {getTime(sunset, lang)}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-start">Visibility: {visibility} meters</p>
          </Col>
          <Col>
            <p className="text-end">Precipitation: {precipitation}mm</p>
          </Col>
        </Row>
      </Container>

      <p className="text-secondary">
        {translate(TRANSLATION.UPDATEAD_AT)}:{" "}
        <span>
          {new Date(updatedAt).toLocaleString(lang, {
            weekday: "long",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "numeric",
          })}
        </span>
      </p>
    </div>
  );
}
