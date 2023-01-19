import React, { useContext } from "react";
import { Stack, Container, Form, Dropdown } from "react-bootstrap";
import { appCtx } from "../../../../shared/context/app-context";
import useLanguage from "../../../../shared/hooks/useTranslation";
import { TRANSLATION } from "../../../../shared/lang/translation";
import LanguageDropdown from "./LanguageDropdown";
import LocationDropdown from "./LocationDropdown";
import SettingsDropdown from "./SettingsDropdown";

interface NavbarDesktopProps {
  cityName: string;
}

export default function NavbarDesktop({ cityName }: NavbarDesktopProps) {
  const translate = useLanguage();
  const { darkMode, toggleDarkMode } = useContext(appCtx);

  return (
    <Stack
      data-testid="navbar-desktop"
      direction="horizontal"
      className="aling-items-center"
      gap={2}>
      <Container
        className="d-flex justify-content-between text-white align-items-center"
        style={{
          minWidth: "40px",
        }}>
        <Form.Label
          htmlFor="darkmode-check"
          data-testid="darkmode-label"
          className="mb-0">
          {translate(TRANSLATION.DARK_MODE)}
        </Form.Label>
        <Form.Check
          id="darkmode-check"
          className="ms-2"
          type="switch"
          aria-label="Dark"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
      </Container>

      <LocationDropdown cityName={cityName} />
      <SettingsDropdown />
      <LanguageDropdown />
    </Stack>
  );
}
