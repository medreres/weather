import { faLocation, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { appCtx } from "../../../../../shared/context/app-context";
import Searchbar from "../../Searchbar";

interface LocationProps {
  cityName: string;
}

export default function Location({ cityName }: LocationProps) {
  const { darkMode, city } = useContext(appCtx);
  return (
    <Dropdown align={{ sm: "end" }}>
      <DropdownToggle variant={darkMode ? "outline-success" : "outline-primary"}>
        <FontAwesomeIcon icon={faLocationDot} /> {cityName}
        </DropdownToggle>
      <DropdownMenu
        style={{
          minWidth: "350px",
        }}>
        <Searchbar />
      </DropdownMenu>
    </Dropdown>
  );
}
