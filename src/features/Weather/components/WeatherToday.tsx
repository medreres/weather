import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { getIcon, getDescription } from "../utils/weatherCode";
import { languageCtx } from "../../../shared/context/app-context";
import useLanguage from "../../../shared/hooks/useTranslation";
import { TRANSLATION } from "../../../shared/lang/translation";
import { getTime, normalizeTemp } from "../utils/formatting";
import styles from "./WeatherToday.module.css";
import { Col, Container, Row, Table } from "react-bootstrap";

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
  const { lang, darkMode } = useContext(languageCtx);

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
      <h5 className={styles["weather-description"]}>{translate(getDescription(weathercode))}</h5>

      <Table
      className={styles['weather-table']}
        striped
        borderless
        variant={darkMode ? "dark" : ""}
        size="sm">
        <tbody>
          <tr>
            <td className={styles['description-right']}>Feels like: {apparent_temperature}</td>
            <td className={styles['description-left']}>Windspeed: {windspeed_10m}</td>
          </tr>
          <tr>
            <td>Sunrise: {getTime(sunrise, lang)}</td>
            <td>Sunset: {getTime(sunset, lang)}</td>
          </tr>
          <tr>
            <td>Visibility: {visibility}m</td>
            <td>Precipitation: {precipitation}mm</td>
          </tr>
        </tbody>
      </Table>
      {/* <Container className="ps-4 pe-4 pt-3">
        <Row className="justify-content-around">
          <Col>
            <p className={styles["description-left"]}>Feels like: {apparent_temperature}</p>
          </Col>
          <Col>
            <p className={styles["description-right"]}>Windspeed: {windspeed_10m}</p>
          </Col>
        </Row>
        <Row className="justify-content-around">
          <Col>
            <p className={styles["description-left"]}>Sunrise: {getTime(sunrise, lang)}</p>
          </Col>
          <Col>
            <p className={styles["description-right"]}>Sunset: {getTime(sunset, lang)}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className={styles["description-left"]}>Visibility: {visibility}m</p>
          </Col>
          <Col>
            <p className={styles["description-right"]}>Precipitation: {precipitation}mm</p>
          </Col>
        </Row>
      </Container> */}

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
