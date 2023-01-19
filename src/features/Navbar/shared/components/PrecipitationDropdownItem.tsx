import { faCloudRain, faPrescription } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Form, ButtonGroup, ToggleButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { appCtx } from "../../../../shared/context/app-context";
import useTranslation from "../../../../shared/hooks/useTranslation";
import { TRANSLATION } from "../../../../shared/lang/translation";
import styles from "./styles.module.css";

export default function PrecipitationDropdownItem() {
  // const [precipitation, setPrecipitation] = useState("mm");
  const { precipUnit, setPrecipUnit, darkMode } = useContext(appCtx);
  const translate = useTranslation();
  return (
    <DropdownItem className={`d-flex justify-content-between align-items-center ${styles["active-off"]}`}>
      <Form.Label
        htmlFor="precipitation-unit"
        className="mb-0">
        <FontAwesomeIcon icon={faCloudRain} /> {translate(TRANSLATION.PRECIPITATION)}
      </Form.Label>
      <ButtonGroup id="precipitation-unit">
        <ToggleButton
          type="radio"
          name="precipitation"
          value="mm"
          variant={darkMode ? "outline-success" : "outline-primary"}
          checked={precipUnit === "mm"}
          onClick={(e) => setPrecipUnit("mm")}>
          mm
        </ToggleButton>
        <ToggleButton
          type="radio"
          name="precipitation"
          value="inch"
          variant={darkMode ? "outline-success" : "outline-primary"}
          checked={precipUnit === "inch"}
          onClick={(e) => setPrecipUnit("inch")}>
          inch
        </ToggleButton>
      </ButtonGroup>
    </DropdownItem>
  );
}
