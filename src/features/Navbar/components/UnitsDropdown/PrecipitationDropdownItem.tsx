import React, { useState } from "react";
import { Form, ButtonGroup, ToggleButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

export default function PrecipitationDropdownItem() {
  const [precipitation, setPrecipitation] = useState("mm");

  return (
    <DropdownItem className="d-flex justify-content-between align-items-center">
      <Form.Label htmlFor="precipitation-unit">Precipitation</Form.Label>
      <ButtonGroup id="precipitation-unit">
        <ToggleButton
          type="radio"
          name="precipitation"
          value="mm"
          variant="outline-primary"
          checked={precipitation === "mm"}
          onClick={(e) => setPrecipitation("mm")}>
          mm
        </ToggleButton>
        <ToggleButton
          type="radio"
          name="precipitation"
          value="inch"
          variant="outline-primary"
          checked={precipitation === "inch"}
          onClick={(e) => setPrecipitation("inch")}>
          inch
        </ToggleButton>
      </ButtonGroup>
    </DropdownItem>
  );
}
