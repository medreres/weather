import React, { useState } from "react";
import { Form, ButtonGroup, ToggleButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

export default function WindDropdownItem() {
  const [wind, setWind] = useState("kmh");
  return (
    <DropdownItem className="d-flex justify-content-between align-items-center">
      <Form.Label htmlFor="wind-speed-unit">Wind Speed</Form.Label>
      <ButtonGroup id="wind-speed-unit">
        <ToggleButton
          type="radio"
          name="wind-speed"
          value="kmh"
          variant="outline-primary"
          checked={wind === "kmh"}
          onClick={(e) => setWind("kmh")}>
          Km/h
        </ToggleButton>
        <ToggleButton
          type="radio"
          name="wind-speed"
          value="mph"
          variant="outline-primary"
          checked={wind === "mph"}
          onClick={(e) => setWind("mph")}>
          Mph
        </ToggleButton>
      </ButtonGroup>
    </DropdownItem>
  );
}
