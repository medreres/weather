import { faWind } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Form, ButtonGroup, ToggleButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { appCtx } from "../../../../shared/context/app-context";
import useTranslation from "../../../../shared/hooks/useTranslation";
import { TRANSLATION } from "../../../../shared/lang/translation";
import styles from "./styles.module.css";

export default function WindDropdownItem() {
  // const [wind, setWind] = useState("kmh");
  const { windspeedUnit, setWindspeedUnit, darkMode } = useContext(appCtx);
  const translate = useTranslation();
  return (
    <DropdownItem className={`d-flex justify-content-between align-items-center ${styles["active-off"]}`}>
      <Form.Label htmlFor="wind-speed-unit" className="mb-0">
        <FontAwesomeIcon icon={faWind} /> {translate(TRANSLATION.WIND_SPEED)}
      </Form.Label>
      <ButtonGroup id="wind-speed-unit">
        <ToggleButton
          type="radio"
          name="wind-speed"
          value="kmh"
          variant={darkMode ? "outline-success" : "outline-primary"}
          checked={windspeedUnit === "kmh"}
          onClick={(e) => setWindspeedUnit("kmh")}>
          Km/h
        </ToggleButton>
        <ToggleButton
          type="radio"
          name="wind-speed"
          value="mph"
          variant={darkMode ? "outline-success" : "outline-primary"}
          checked={windspeedUnit === "mph"}
          onClick={(e) => setWindspeedUnit("mph")}>
          Mph
        </ToggleButton>
      </ButtonGroup>
    </DropdownItem>
  );
}
