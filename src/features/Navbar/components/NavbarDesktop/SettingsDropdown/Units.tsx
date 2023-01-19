import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { appCtx } from "../../../../../shared/context/app-context";
import useTranslation from "../../../../../shared/hooks/useTranslation";
import { TRANSLATION } from "../../../../../shared/lang/translation";
import PrecipitationDropdownItem from "../../../shared/components/PrecipitationDropdownItem";
import TemperatureDropdown from "../../../shared/components/TemperatureDropdownItem";
import WindDropdownItem from "../../../shared/components/WindDropdownItem";

export default function Units() {
  const { darkMode } = useContext(appCtx);
  const translate = useTranslation();
  return (
    <Dropdown
      align={{ sm: "end" }}
      autoClose="outside">
      <DropdownToggle variant={darkMode ? "outline-success" : "outline-primary"}>
        <FontAwesomeIcon icon={faGear} /> {translate(TRANSLATION.SETTINGS)}
      </DropdownToggle>
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
