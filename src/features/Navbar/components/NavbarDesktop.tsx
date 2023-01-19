import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Stack, Container, Form, Dropdown } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { languageCtx } from "../../../shared/context/app-context";
import useLanguage from "../../../shared/hooks/useTranslation";
import { TRANSLATION } from "../../../shared/lang/translation";
import Searchbar from "./Searchbar";
import Units from "./UnitsDropdown";
import LanguageDropdown from "./LanguageDropdown";

interface NavbarDesktopProps {
  cityName: string;
}

export default function NavbarDesktop({ cityName }: NavbarDesktopProps) {
  const translate = useLanguage();
  const { lang, setLanguage, darkMode, toggleDarkMode } = useContext(languageCtx);

  return (
    <Stack
      data-testid="navbar-desktop"
      direction="horizontal"
      className="aling-items-center"
      gap={2}>
      <Container
        className="d-inline-flex justify-content-between text-white"
        style={{
          minWidth: "40px",
        }}>
        <Form.Label className="d-flex align-items-center justify-content-center">
          <span data-testid="darkmode-label">{translate(TRANSLATION.DARK_MODE)}</span>
          <Form.Check
            className="ms-2"
            type="switch"
            aria-label="Dark"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
        </Form.Label>
      </Container>

      {/* Searchbar dropdown */}
      <Dropdown align={{ sm: "end" }}>
        <DropdownToggle variant={darkMode ? "outline-success" : "outline-primary"}>{cityName}</DropdownToggle>
        <DropdownMenu
          style={{
            minWidth: "350px",
          }}>
          <Searchbar />
        </DropdownMenu>
      </Dropdown>

      {/* units dropdown */}
      <Units />

      {/* language dropdown */}
      <LanguageDropdown />
    </Stack>
  );
}
