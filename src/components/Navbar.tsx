import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Container, Dropdown, Nav, Navbar as NavbarBootstrap, NavDropdown, Offcanvas } from "react-bootstrap";
import { languageCtx } from "../shared/context/language-context";
import useLanguage from "../shared/hooks/useLanguage";
import { TRANSLATION, LANGUAGES } from "../shared/translation";
import Searchbar from "./Searchbar";
interface NavbarProps {
  cityName: string;
}

export default function Navbar({ cityName }: NavbarProps) {
  const translate = useLanguage();
  const { lang, setLanguage } = useContext(languageCtx);
  return (
    <NavbarBootstrap
      bg="dark"
      variant="dark"
      className="mb-3"
      expand="sm">
      <Container fluid>
        <NavbarBootstrap.Brand>Weather</NavbarBootstrap.Brand>

        <NavbarBootstrap.Toggle />

        <NavbarBootstrap.Offcanvas
          id="navbar"
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Weather</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavDropdown
                autoClose="outside"
                title={cityName}
                className="me-3 street-dropdown"
                align={{ lg: "end" }}>
                <Searchbar />
              </NavDropdown>
              <Dropdown  align={{ lg: 'end' }}>
                <Dropdown.Toggle>
                  <FontAwesomeIcon icon={faGlobe} /> {translate(TRANSLATION.LANGUAGE)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Header>{translate(TRANSLATION.INTERFACE_LANGUAGE)}</Dropdown.Header>
                  <Dropdown.Divider />
                  {Object.keys(LANGUAGES).map((option) => (
                    <Dropdown.Item
                      disabled={option === lang}
                      key={option}
                      onClick={() => {
                        setLanguage(option);
                      }}>
                      {(LANGUAGES as any)[option]}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Offcanvas.Body>
        </NavbarBootstrap.Offcanvas>
      </Container>
    </NavbarBootstrap>
  );
}
