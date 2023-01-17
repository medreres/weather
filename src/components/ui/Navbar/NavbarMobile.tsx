import { faLocation, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Offcanvas, ListGroup, ListGroupItem, Form } from "react-bootstrap";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { languageCtx } from "../../../shared/context/language-context";
import useLanguage from "../../../shared/hooks/useTranslation";
import { TRANSLATION, LANGUAGES } from "../../../shared/lang/translation";
import OffcanvasCustom from "./Offcanvas";
import Searchbar from "./Searchbar";

interface NavbarMobileProps {
  cityName: string;
}

export default function NavbarMobile({ cityName }: NavbarMobileProps) {
  const translate = useLanguage();
  const { lang, setLanguage, darkMode, toggleDarkMode } = useContext(languageCtx);

  const [showMainCanvas, setShowMainCanvas] = useState(false);
  const toggleMainCanvas = () => setShowMainCanvas((prevState) => !prevState);

  const [showLocationCanvas, setShowLocationCanvas] = useState(false);
  const toggleLocationCanvas = () => setShowLocationCanvas((prevState) => !prevState);

  const [showLanguageCanvas, setShowLanguageCanvas] = useState(false);
  const toggleLanguageCanvas = () => setShowLanguageCanvas((prevState) => !prevState);

  return (
    <>
      <NavbarToggle
        data-testid="navbar-mobile-toggler"
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
            <ListGroupItem>
              <Form.Label className="d-flex justify-content-between align-items-center">
                <span data-testid="darkmode-group-item">{translate(TRANSLATION.DARK_MODE)}</span>
                <Form.Check
                  type="switch"
                  aria-label="Dark"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
              </Form.Label>
            </ListGroupItem>
          </ListGroup>

          {/* location canvas */}
          <OffcanvasCustom
            show={showLocationCanvas}
            onHide={toggleLocationCanvas}
            title={cityName}>
            <Searchbar />
          </OffcanvasCustom>

          {/* language canvas */}
          <OffcanvasCustom
            labelId="offcanvas-language-title"
            show={showLanguageCanvas}
            onHide={toggleLanguageCanvas}
            title={translate(TRANSLATION.LANGUAGE)}>
            <ListGroup>
              {Object.keys(LANGUAGES).map((option) => (
                <ListGroupItem
                  data-testid={option}
                  active={option === lang}
                  key={option}
                  onClick={() => {
                    setLanguage(option);
                  }}>
                  {(LANGUAGES as any)[option]}
                </ListGroupItem>
              ))}
            </ListGroup>
          </OffcanvasCustom>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
