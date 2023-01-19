import React, { useState } from "react";
import { Form, ButtonGroup, ToggleButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

export default function TimezoneDropdownItem() {
  const [timzone, setTimezone] = useState("kmh");
  return (
    <DropdownItem className="d-flex justify-content-between align-items-center">
      <Form.Label htmlFor="wind-speed-unit">Wind Speed</Form.Label>
      
    </DropdownItem>
  );
}
