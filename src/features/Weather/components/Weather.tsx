import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { getIcon, getDescription } from "../utils/weatherCode";
import { languageCtx } from "../context/language-context";
import useLanguage from "../../../shared/hooks/useTranslation";
import { getDay, normalizeDate, normalizeTemp } from "../utils/formatting";

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
      className={`${active ? "active" : ""} weather-card`}
      style={{
        width: "20vmin",
        margin: "1vmin",
        fontSize: "3vmin",
        minWidth: "22vmin",
      }}
      data-testid="weather">
      <Card.Body>
        <Card.Title
          style={{
            fontSize: "2.5vmin",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
          data-testid="date">
          {normalizeDate(time, lang)}
        </Card.Title>
        <FontAwesomeIcon
          size="2x"
          icon={getIcon(weathercode)}
        />
        <Card.Text>
          <span
            style={{
              fontSize: "8vmin",
              letterSpacing: "-5px",
            }}
            data-testid="min-temp">
            {normalizeTemp(temp_min)}˚
          </span>
          <span
            style={{
              fontSize: "4vmin",
              letterSpacing: "-2px",
            }}
            data-testid="max-temp">
            {normalizeTemp(temp_max)}˚
          </span>
          <br />
          <span
            style={{
              fontSize: "1.3vmin",
              lineHeight: "1.5vmin",
              display: "inline-block",
            }}
            data-testid="description">
            {translate(getDescription(weathercode))}
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
