import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { languageCtx } from "../../../../shared/context/app-context";
import PrecipitationDropdownItem from "./PrecipitationDropdownItem";
import TemperatureDropdown from "./TemperatureDropdownItem";
import WindDropdownItem from "./WindDropdownItem";

export default function Units() {
  const { darkMode } = useContext(languageCtx);
  return (
    <Dropdown
      align={{ sm: "end" }}
      autoClose="outside">
      <DropdownToggle variant={darkMode ? "outline-success" : "outline-primary"}>Units</DropdownToggle>
      <DropdownMenu
        style={{
          minWidth: "350px",
        }}>
        <TemperatureDropdown />
        <PrecipitationDropdownItem />
        <WindDropdownItem />
      </DropdownMenu>
    </Dropdown>
  );
}
