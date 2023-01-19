import React, { useState } from "react";
import { Form, ButtonGroup, ToggleButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

export default function TemperatureDropdown() {
  const [temperature, setTemperature] = useState("cel");
  return (
    <DropdownItem className="d-flex justify-content-between align-items-center">
      <Form.Label htmlFor="temperature-unit">Temperature</Form.Label>
      <ButtonGroup id="temperature-unit">
        <ToggleButton
          type="radio"
          name="temperature"
          value="cel"
          variant="outline-primary"
          checked={temperature === "cel"}
          onClick={(e) => setTemperature("cel")}>
          °C
        </ToggleButton>
        <ToggleButton
          type="radio"
          name="temperature"
          value="far"
          variant="outline-primary"
          checked={temperature === "far"}
          onClick={(e) => setTemperature("far")}>
          °F
        </ToggleButton>
      </ButtonGroup>
    </DropdownItem>
  );
}
