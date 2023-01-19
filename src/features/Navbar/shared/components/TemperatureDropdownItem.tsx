import { faTemperatureHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Form, ButtonGroup, ToggleButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { appCtx } from "../../../../shared/context/app-context";
import useTranslation from "../../../../shared/hooks/useTranslation";
import { TRANSLATION } from "../../../../shared/lang/translation";
import styles from "./styles.module.css";

export default function TemperatureDropdown(props?: any) {
  const { tmpUnit, setTmpUnit, darkMode } = useContext(appCtx);
  const translate = useTranslation();
  return (
    <DropdownItem
      className={`d-flex justify-content-between align-items-center ${styles["active-off"]}`}
      {...props}>
      <Form.Label
        htmlFor="temperature-unit"
        className="mb-0">
        <FontAwesomeIcon icon={faTemperatureHalf} /> {translate(TRANSLATION.TEMPERATURE)}
      </Form.Label>
      <ButtonGroup id="temperature-unit">
        <ToggleButton
          type="radio"
          name="temperature"
          value="c"
          variant={darkMode ? "outline-success" : "outline-primary"}
          checked={tmpUnit === "c"}
          onClick={(e) => setTmpUnit("c")}>
          °C
        </ToggleButton>
        <ToggleButton
          type="radio"
          name="temperature"
          value="f"
          variant={darkMode ? "outline-success" : "outline-primary"}
          checked={tmpUnit === "f"}
          onClick={(e) => setTmpUnit("f")}>
          °F
        </ToggleButton>
      </ButtonGroup>
    </DropdownItem>
  );
}
