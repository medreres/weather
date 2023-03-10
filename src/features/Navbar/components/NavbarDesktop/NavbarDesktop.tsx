import { faCity } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { Stack, Container, Form, Dropdown } from "react-bootstrap";
import { appCtx } from "../../../../shared/context/app-context";
import useLanguage from "../../../../shared/hooks/useTranslation";
import { TRANSLATION } from "../../../../shared/lang/translation";
import LanguageDropdown from "./LanguageDropdown";
import LocationDropdown from "./LocationDropdown";
import SettingsDropdown from "./SettingsDropdown";

export default function NavbarDesktop() {
  const translate = useLanguage();
  const { darkMode, toggleDarkMode, city } = useContext(appCtx);

  return (
    <Stack
      data-testid="navbar-desktop"
      direction="horizontal"
      className="aling-items-center"
      gap={2}>
      <Container
        className="d-flex justify-content-center text-white align-items-center"
        style={{
          minWidth: "40px",
        }}>
        <Form.Label
          htmlFor="darkmode-check"
          data-testid="darkmode-label"
          className="mb-0 me-2">
          {translate(TRANSLATION.DARK_MODE)}
        </Form.Label>
        <Form.Check
          id="darkmode-check"
          type="switch"
          aria-label="Dark"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
      </Container>

      <LocationDropdown cityName={city.label} />
      <SettingsDropdown />
      <LanguageDropdown />
    </Stack>
  );
}
