import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LanguageContextProvider } from "../../../../shared/context/app-context";
import en from "../../../../shared/lang/english.json";
import uk from "../../../../shared/lang/ukrainian.json";
import NavbarDesktop from "../NavbarDesktop/NavbarDesktop";

const MockNavbar = () => {
  const cityName = "Sambir";
  return (
    <LanguageContextProvider>
      <NavbarDesktop cityName={cityName} />
    </LanguageContextProvider>
  );
};

const toggleUkrainian = () => {
  fireEvent.click(screen.getByTestId("language-dropdown"));
  fireEvent.click(screen.getByTestId("toggle-uk"));
};

describe("Navbar", () => {
  it("renders", () => {
    render(<NavbarDesktop cityName="" />);

    expect(screen.getByTestId("navbar-desktop")).toBeDefined();
  });

  it("renders in English (by default)", () => {
    render(<MockNavbar />);

    fireEvent.click(screen.getByTestId("language-dropdown"));

    expect(screen.getByTestId("darkmode-label").innerHTML).toBe(en.DARK_MODE);
    expect(screen.getByTestId("language-label").innerHTML).toBe(en.LANGUAGE);    
    expect(screen.getByTestId("interface-language").innerHTML).toBe(en.INTERFACE_LANGUAGE);
  });

  it("renders in Ukrainian", () => {
    // arrange
    render(<MockNavbar />);

    // act
    toggleUkrainian();
    fireEvent.click(screen.getByTestId("language-dropdown"));

    // assert
    expect(screen.getByTestId("darkmode-label").innerHTML).toBe(uk.DARK_MODE);
    expect(screen.getByTestId("language-label").innerHTML).toBe(uk.LANGUAGE);
    expect(screen.getByTestId("interface-language").innerHTML).toBe(uk.INTERFACE_LANGUAGE);
  });
});
