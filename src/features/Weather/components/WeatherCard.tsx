import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { getIcon, getDescription } from "../utils/weatherCode";
import { languageCtx } from "../../../shared/context/app-context";
import useLanguage from "../../../shared/hooks/useTranslation";
import { getDay, normalizeDate, normalizeTemp } from "../utils/formatting";
import styles from "./WeatherCard.module.css";

type WeatherProps = {
  time: string;
  weathercode: number;
  temp_min: number;
  temp_max: number;
  active: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Weather({ time, weathercode, temp_min, temp_max, active, onClick }: WeatherProps) {
  const translate = useLanguage();
  const { lang } = useContext(languageCtx);
  return (
    <Card
      onClick={onClick}
      className={`${active ? styles.active : ""} ${styles["weather-card"]}`}
      data-testid="weather">
      <Card.Body>
        <Card.Title
          className={styles["weather-title"]}
          data-testid="date">
          {normalizeDate(time, lang)}
        </Card.Title>
        <FontAwesomeIcon
          size="3x"
          icon={getIcon(weathercode)}
        />
        <Card.Text>
          <span
            className={styles["weather-min-temp"]}
            data-testid="min-temp">
            {normalizeTemp(temp_min)}˚
          </span>
          <span className={styles["weather-max-temp"]}
            data-testid="max-temp">
            {normalizeTemp(temp_max)}˚
          </span>
          <br />
          <span className={styles["weather-description"]}
            data-testid="description">
            {translate(getDescription(weathercode))}
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
