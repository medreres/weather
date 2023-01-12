import { faGlobe, faLanguage, faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar as NavbarBootstrap,
  NavDropdown,
  Offcanvas,
  Stack,
} from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { languageCtx } from "../shared/context/language-context";
import useLanguage from "../shared/hooks/useLanguage";
import { TRANSLATION, LANGUAGES } from "../shared/translation";
import OffcanvasCustom from "./OffcanvasCustom";
import Searchbar from "./Searchbar";
import Test from "./Test";
interface NavbarProps {
  cityName: string;
}

const SMALL_SCREEN = 576;

export default function Navbar({ cityName }: NavbarProps) {
  const translate = useLanguage();
  const { lang, setLanguage } = useContext(languageCtx);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [showMainCanvas, setShowMainCanvas] = useState(false);
  const toggleMainCanvas = () => setShowMainCanvas((prevState) => !prevState);

  const [showLocationCanvas, setShowLocationCanvas] = useState(false);
  const toggleLocationCanvas = () => setShowLocationCanvas((prevState) => !prevState);

  const [showLanguageCanvas, setShowLanguageCanvas] = useState(false);
  const toggleLanguageCanvas = () => setShowLanguageCanvas((prevState) => !prevState);

  useEffect(() => {
    const foo = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", foo);

    return () => {
      window.removeEventListener("resize", foo);
    };
  }, [window.innerWidth]);

  return (
    <NavbarBootstrap
      bg="dark"
      variant="dark"
      className="mb-3"
      expand="sm">
      <Container fluid>
        <NavbarBootstrap.Brand>{translate(TRANSLATION.WEATHER)}</NavbarBootstrap.Brand>
        {/* destkop view */}
        {screenWidth > SMALL_SCREEN && (
          <Stack direction="horizontal"  gap={2}>
            <Dropdown  align={{ sm: "end" }}>
              <DropdownToggle>{cityName}</DropdownToggle>
              <DropdownMenu className="location-dropdown">
                <Searchbar />
              </DropdownMenu>
            </Dropdown>
            <Dropdown align={{ sm: "end" }}>
              <Dropdown.Toggle>
                <FontAwesomeIcon icon={faGlobe} /> {translate(TRANSLATION.LANGUAGE)}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Header>{translate(TRANSLATION.INTERFACE_LANGUAGE)}</Dropdown.Header>
                <Dropdown.Divider />
                {Object.keys(LANGUAGES).map((option) => (
                  <Dropdown.Item
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
        )}

        {/* mobile view */}
        {screenWidth <= SMALL_SCREEN && (
          <>
            <NavbarToggle onClick={toggleMainCanvas} />
            <Offcanvas
              show={showMainCanvas}
              onHide={toggleMainCanvas}
              placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>{translate(TRANSLATION.WEATHER)}</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <ListGroup variant="flush">
                  <ListGroupItem
                    action
                    onClick={toggleLocationCanvas}>
                    <span>{translate(TRANSLATION.LOCATION)}</span> <FontAwesomeIcon icon={faLocation} />
                  </ListGroupItem>
                  <ListGroupItem
                    action
                    onClick={toggleLanguageCanvas}>
                    <span>{translate(TRANSLATION.LANGUAGE)}</span> <FontAwesomeIcon icon={faLanguage} />
                  </ListGroupItem>
                </ListGroup>

                {/* location canvas */}
                <Offcanvas
                  placement="end"
                  show={showLocationCanvas}
                  onHide={toggleLocationCanvas}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{cityName}</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Searchbar />
                  </Offcanvas.Body>
                </Offcanvas>

                {/* language canvas */}
                <Offcanvas
                  placement="end"
                  show={showLanguageCanvas}
                  onHide={toggleLanguageCanvas}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{translate(TRANSLATION.LANGUAGE)}</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <ListGroup>
                      {Object.keys(LANGUAGES).map((option) => (
                        <ListGroupItem
                          active={option === lang}
                          key={option}
                          onClick={() => {
                            setLanguage(option);
                          }}>
                          {(LANGUAGES as any)[option]}
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </Offcanvas.Body>
                </Offcanvas>
              </Offcanvas.Body>
            </Offcanvas>
          </>
        )}
      </Container>
    </NavbarBootstrap>
  );
}

// <Nav className="justify-content-end flex-grow-1 pe-3">

// {screenWidth < 576 && <OffcanvasCustom>Hi</OffcanvasCustom>}
// <Dropdown align={{ lg: "end" }}>
//   <Dropdown.Toggle>
//     <FontAwesomeIcon icon={faGlobe} /> {translate(TRANSLATION.LANGUAGE)}
//   </Dropdown.Toggle>
//   <Dropdown.Menu>
//     <Dropdown.Header>{translate(TRANSLATION.INTERFACE_LANGUAGE)}</Dropdown.Header>
//     <Dropdown.Divider />
//     {Object.keys(LANGUAGES).map((option) => (
//       <Dropdown.Item
//         disabled={option === lang}
//         key={option}
//         onClick={() => {
//           setLanguage(option);
//         }}>
//         {(LANGUAGES as any)[option]}
//       </Dropdown.Item>
//     ))}
//   </Dropdown.Menu>
// </Dropdown>
// </Nav>
