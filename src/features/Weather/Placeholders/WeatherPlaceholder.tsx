import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Placeholder } from "react-bootstrap";
import { getIcon, getDescription } from "../utils/weatherCode";
import { getDay, normalizeTemp } from "../utils/formatting";
import styles from "./WeatherPlaceholder.module.css";

export default function WeatherPlaceholder() {
  return (
    <Card
      style={{
        width: "20vmin",
        margin: "1vmin",
        fontSize: "3vmin",
        minWidth: "22vmin",
        height: '244px'
      }}
    >
      <Card.Body>
        <Placeholder
          as={Card.Title}
          animation="glow"
          style={{
            height: "2.5vmin",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <Placeholder xs={8} /> <Placeholder xs={2} />
        </Placeholder>
        <FontAwesomeIcon
          className={`${styles.glowing} mb-4`}
          size="2x"
          icon={getIcon(0)}
        />
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder
            xs={4}
            style={{
              fontSize: "8vmin",
              letterSpacing: "-5px",
            }}
          />{" "}
          <Placeholder
            xs={3}
            className="mb-3"
            style={{
              fontSize: "4vmin",
              letterSpacing: "-2px",
            }}
          />
          <br />
          <Placeholder
            xs={10}
            style={{
              fontSize: "1.3vmin",
              height: "1.5vmin",
              display: "inline-block",
            }}
          />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}
