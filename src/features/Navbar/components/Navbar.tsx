import React, { useContext, useEffect, useState } from "react";
import { Container, Navbar as NavbarBootstrap } from "react-bootstrap";
import { appCtx } from "../../../shared/context/app-context";
import useLanguage from "../../../shared/hooks/useTranslation";
import { TRANSLATION } from "../../../shared/lang/translation";
import NavbarMobile from "./NavbarMobile/NavbarMobile";
import NavbarDesktop from "./NavbarDesktop/NavbarDesktop";
import { SMALL_SCREEN } from "../../../shared/data/const";
interface NavbarProps {
  cityName: string;
}

export default function Navbar({ cityName }: NavbarProps) {
  const translate = useLanguage();
  const { darkMode } = useContext(appCtx);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const setWidth = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", setWidth);

    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, [window.innerWidth]);

  return (
    <NavbarBootstrap
      bg="dark"
      variant="dark"
      className={`mb-3 ${darkMode ? "bg-body-tertiary" : ""}`}
      expand="sm"
      data-testid='navbar'
      >
      <Container fluid>
        <NavbarBootstrap.Brand data-testid='navbar-brand'>{translate(TRANSLATION.WEATHER)}</NavbarBootstrap.Brand>
        {/* destkop view */}
        {screenWidth > SMALL_SCREEN && <NavbarDesktop cityName={cityName} />}

        {/* mobile view */}
        {screenWidth <= SMALL_SCREEN && <NavbarMobile cityName={cityName} />}
      </Container>
    </NavbarBootstrap>
  );
}
