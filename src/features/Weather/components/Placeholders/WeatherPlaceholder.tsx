import { faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Placeholder } from "react-bootstrap";
import { getIcon } from "../../utils/weatherCode";
import styles from "../WeatherCard.module.css";

export default function WeatherPlaceholder() {
  return (
    <Card className={styles["weather-card"]}>
      <Card.Body>
        <Card.Title
          className={`${styles["weather-title"]} placeholder-glow`}
          data-testid="date">
          <Placeholder xs={6} /> <Placeholder xs={2} />
        </Card.Title>
        <FontAwesomeIcon
          className={styles.glowing}
          size="3x"
          icon={faSun}
        />
        <Card.Text>
          <span
            className={styles["weather-max-temp"] + " placeholder-glow me-3"}
            data-testid="max-temp">
            <Placeholder xs={3} />
          </span>
          <span
            className={styles["weather-min-temp"] + " placeholder-glow"}
            data-testid="min-temp">
            <Placeholder xs={3} />
          </span>
          <br />
          <span
            className={styles["weather-description"] + " placeholder-glow"}
            data-testid="description">
            <Placeholder style={{ width: "5vmin" }} /> <Placeholder style={{ width: "7vmin" }} />{" "}
            <Placeholder style={{ width: "3vmin" }} /> <br />
            <Placeholder style={{ width: "6vmin" }} /> <Placeholder style={{ width: "5vmin" }} />
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
