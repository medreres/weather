import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Stack, Container, Form, Dropdown } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { languageCtx } from "../../../shared/context/language-context";
import useLanguage from "../../../shared/hooks/useTranslation";
import { TRANSLATION, LANGUAGES } from "../../../shared/lang/translation";
import Searchbar from "./Searchbar";

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
        className="d-inline-flex justify-content-between
               align-items-center
             text-white"
        style={{
          minWidth: "40px",
        }}>
        <Form.Label className="d-flex align-items-center justify-content-center">
          <span data-testid="darkmode-label">{translate(TRANSLATION.DARK_MODE)}</span>
          <Form.Check
            type="switch"
            aria-label="Dark"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
        </Form.Label>
      </Container>

      <Dropdown align={{ sm: "end" }}>
        <DropdownToggle variant={darkMode ? "outline-success" : "outline-primary"}>{cityName}</DropdownToggle>
        <DropdownMenu className="location-dropdown">
          <Searchbar />
        </DropdownMenu>
      </Dropdown>

      <Dropdown align={{ sm: "end" }}>
        <Dropdown.Toggle
          data-testid="language-dropdown"
          variant={darkMode ? "outline-success" : "outline-primary"}>
          <FontAwesomeIcon icon={faGlobe} /> <span data-testid="language-label">{translate(TRANSLATION.LANGUAGE)}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Header data-testid='interface-language'>{translate(TRANSLATION.INTERFACE_LANGUAGE)}</Dropdown.Header>
          <Dropdown.Divider />
          {Object.keys(LANGUAGES).map((option) => (
            <Dropdown.Item
              data-testid={`toggle-${option}`}
              active={option === lang}
              key={option}
              onClick={() => {
                setLanguage(option);
              }}>
              {(LANGUAGES as any)[option]}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  );
}
