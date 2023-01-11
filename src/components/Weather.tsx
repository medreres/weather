import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MouseEventHandler } from "react";
import { Card } from "react-bootstrap";
import { getIcon, getDescription } from "../../weatherCode";
import useLanguage from "../shared/hooks/useLanguage";
import { getDay, normalizeTemp } from "../shared/util/formatting";

type WeatherProps = {
  time: string;
  weathercode: number;
  temp_min: number;
  temp_max: number;
  lang: string;
  active: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Weather({
  time,
  weathercode,
  temp_min,
  temp_max,
  lang,
  active,
  onClick,
}: WeatherProps) {
  const translate = useLanguage();
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
    >
      <Card.Body>
        <Card.Title
          style={{
            fontSize: "2.5vmin",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {getDay(time, lang)}, {new Date(time).getDate()}
        </Card.Title>
        <FontAwesomeIcon size="2x" icon={getIcon(weathercode)} />
        <Card.Text>
          <span
            style={{
              fontSize: "8vmin",
              letterSpacing: "-5px",
            }}
          >
            {normalizeTemp(temp_min)}˚
          </span>
          <span
            style={{
              fontSize: "4vmin",
              letterSpacing: "-2px",
            }}
          >
            {normalizeTemp(temp_max)}˚
          </span>
          <br />
          <span
            style={{
              fontSize: "1.3vmin",
              lineHeight: "1.5vmin",
              display: "inline-block",
            }}
          >
            {translate(getDescription(weathercode))}
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
