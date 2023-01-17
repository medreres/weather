import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Placeholder } from "react-bootstrap";
import { getIcon, getDescription } from "../utils/weatherCode";
import useLanguage from "../../../shared/hooks/useTranslation";
import styles from "./WeatherPlaceholder.module.css";

export default function WeatherTodayPlaceholder() {
  const translate = useLanguage();
  return (
    <div className="w-100 text-center">
      <Placeholder animation="glow">
        <Placeholder
          xs={2}
          style={{
            height: "3vmin",
          }}
        />
        <br />

        <FontAwesomeIcon
          className={`${styles.glowing} mt-3`}
          size="6x"
          icon={getIcon(0)}
        />
        <br />
        <Placeholder xs={2} className="mt-3" />
      </Placeholder>
    </div>
  );
}
