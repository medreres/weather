import { faLocation, faLanguage, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Offcanvas, ListGroup, ListGroupItem, Form } from "react-bootstrap";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { appCtx } from "../../../../shared/context/app-context";
import useLanguage from "../../../../shared/hooks/useTranslation";
import { TRANSLATION } from "../../../../shared/lang/translation";
import LanguageOffcanvas from "./LanguageOffcanvas";
import LocationOffcanvas from "./LocationOffcanvas";
import SettingsOffcanvas from "./SettingsOffcanvas";

interface NavbarMobileProps {
  cityName: string;
}

export default function NavbarMobile({ cityName }: NavbarMobileProps) {
  const translate = useLanguage();
  const { darkMode, toggleDarkMode } = useContext(appCtx);

  const [showMainCanvas, setShowMainCanvas] = useState(false);
  const toggleMainCanvas = () => setShowMainCanvas((prevState) => !prevState);

  const [showLocationCanvas, setShowLocationCanvas] = useState(false);
  const toggleLocationCanvas = () => setShowLocationCanvas((prevState) => !prevState);

  const [showLanguageCanvas, setShowLanguageCanvas] = useState(false);
  const toggleLanguageCanvas = () => setShowLanguageCanvas((prevState) => !prevState);

  const [showSettingsCanvas, setshowSettingsCanvas] = useState(false);
  const toggleSettingsCanvas = () => setshowSettingsCanvas((prevState) => !prevState);

  return (
    <>
      <NavbarToggle
        data-testid="navbar-mobile-toggler"
        className="d-sm-block"
        onClick={toggleMainCanvas}
      />
      <Offcanvas
        show={showMainCanvas}
        onHide={toggleMainCanvas}
        placement="end"
        data-testid="navbar-mobile">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title data-testid="offcanvas-title">{translate(TRANSLATION.WEATHER)}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            <ListGroupItem
              className="d-flex justify-content-between align-items-center"
              action
              onClick={toggleLocationCanvas}>
              <span data-testid="location-group-item">{translate(TRANSLATION.LOCATION)}</span>{" "}
              <FontAwesomeIcon icon={faLocation} />
            </ListGroupItem>
            <ListGroupItem
              className="d-flex justify-content-between align-items-center"
              action
              onClick={toggleLanguageCanvas}>
              <span data-testid="language-group-item">{translate(TRANSLATION.LANGUAGE)}</span>{" "}
              <FontAwesomeIcon icon={faLanguage} />
            </ListGroupItem>
            <ListGroupItem
              className="d-flex justify-content-between align-items-center"
              action
              onClick={toggleSettingsCanvas}>
              <span data-testid="settings-group-item">{translate(TRANSLATION.SETTINGS)}</span>{" "}
              <FontAwesomeIcon icon={faGear} />
            </ListGroupItem>
            <ListGroupItem className="d-flex justify-content-between align-items-center">
              <Form.Label
                htmlFor="darkmode-toggle"
                data-testid="darkmode-group-item"
                className="d-flex justify-content-between align-items-center mb-0">
                {translate(TRANSLATION.DARK_MODE)}
              </Form.Label>
              <Form.Check
                id="darkmode-toggle"
                type="switch"
                aria-label="Dark"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
            </ListGroupItem>
          </ListGroup>

          <LocationOffcanvas
            show={showLocationCanvas}
            onHide={toggleLocationCanvas}
            cityName={cityName}
          />
          <LanguageOffcanvas
            show={showLanguageCanvas}
            onHide={toggleLanguageCanvas}
          />
          <SettingsOffcanvas
            show={showSettingsCanvas}
            onHide={toggleSettingsCanvas}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
