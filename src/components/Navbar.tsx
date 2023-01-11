import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import {
  Container,
  Dropdown,
  Navbar as NavbarBootstrap,
} from "react-bootstrap";
import { languageCtx } from "../shared/context/language-context";
import useLanguage from "../shared/hooks/useLanguage";
import { TRANSLATION, LANGUAGES } from "../shared/translation";
export default function Navbar() {
  const translate = useLanguage();
  const { lang, setLanguage } = useContext(languageCtx);
  return (
    <NavbarBootstrap
      bg="dark"
      variant="dark"
      className="mb-3"
    >
      <Container fluid>
        <NavbarBootstrap.Brand>Weather</NavbarBootstrap.Brand>
        <Dropdown align="end">
          <Dropdown.Toggle>
            <FontAwesomeIcon icon={faGlobe} /> {translate(TRANSLATION.LANGUAGE)}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Header>
              {translate(TRANSLATION.INTERFACE_LANGUAGE)}
            </Dropdown.Header>
            <Dropdown.Divider />
            {Object.keys(LANGUAGES).map((option) => (
              <Dropdown.Item
                disabled={option === lang}
                key={option}
                onClick={() => {
                  setLanguage(option);
                }}
              >
                {(LANGUAGES as any)[option]}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </NavbarBootstrap>
  );
}
