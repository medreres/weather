import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { getIcon, getDescription } from "../utils/weatherCode";
import { appCtx } from "../../../shared/context/app-context";
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
  cityName,
  weathercode,
  temperature,
  updatedAt,
  sunrise,
  sunset,
  windspeed_10m,
  apparent_temperature,
  visibility,
  precipitation,
}: WeatherTodayProps) {
  const translate = useLanguage();
  const { lang, darkMode, tmpUnit, precipUnit, windspeedUnit } = useContext(appCtx);

  return (
    <div className={styles["weather-today"]}>
      <h1>{cityName}</h1>
      <h2
        style={{
          fontSize: "13vmin",
        }}>
        <FontAwesomeIcon icon={getIcon(weathercode)} /> {normalizeTemp(temperature)} ˚{tmpUnit.toUpperCase()}
      </h2>
      <h5 className={styles["weather-description"]}>{translate(getDescription(weathercode))}</h5>

      <Table
        className={styles["weather-table"]}
        striped
        borderless
        variant={darkMode ? "dark" : ""}
        size="sm">
        <tbody>
          <tr>
            <td className={styles["description-right"]}>
              {translate(TRANSLATION.APPARENT_TEMPERATURE)}: {apparent_temperature} ˚{tmpUnit.toUpperCase()}
            </td>
            <td className={styles["description-left"]}>
              {translate(TRANSLATION.WIND_SPEED)}: {windspeed_10m}{" "}
              {windspeedUnit[0].toUpperCase() + windspeedUnit.slice(1)}
            </td>
          </tr>
          <tr>
            <td>
              {translate(TRANSLATION.SUNRISE)}: {getTime(sunrise, lang)}
            </td>
            <td>
              {translate(TRANSLATION.SUNSET)}: {getTime(sunset, lang)}
            </td>
          </tr>
          <tr>
            <td>
              {translate(TRANSLATION.VISIBILITY)}: {visibility}m
            </td>
            <td>
              {translate(TRANSLATION.PRECIPITATION)}: {precipitation} {precipUnit}
            </td>
          </tr>
        </tbody>
      </Table>

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
