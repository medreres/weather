import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LanguageContextProvider } from "../../../../shared/context/language-context";
import en from "../../../../shared/lang/english.json";
import uk from "../../../../shared/lang/ukrainian.json";
import NavbarMobile from "../NavbarMobile";
import { toggleUkrainianMobile } from "./utils/toggleUkrainian";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const MockNavbarMobile = () => {
  return (
    <LanguageContextProvider>
      <NavbarMobile cityName="" />
    </LanguageContextProvider>
  );
};

describe("NavbarMobile", () => {
  it("renders", () => {
    render(<MockNavbarMobile />);

    expect(screen.getByTestId("navbar-mobile-toggler")).toBeDefined();
  });

  it("renders in English (by default)", () => {
    render(<MockNavbarMobile />);

    // open offcanvas
    fireEvent.click(screen.getByTestId("navbar-mobile-toggler"));

    // check each option individually

    // language selector
    const languageGroupItem = screen.getByTestId("language-group-item");
    expect(languageGroupItem.innerHTML).toBe(en.LANGUAGE);
    fireEvent.click(languageGroupItem);
    expect(screen.getByTestId("offcanvas-language-title").innerHTML).toBe(en.LANGUAGE);

    // location selector
    expect(screen.getByTestId("location-group-item").innerHTML).toBe(en.LOCATION);

    // dark mode
    expect(screen.getByTestId("darkmode-group-item").innerHTML).toBe(en.DARK_MODE);
  });

  it("renders in Ukrainian", () => {
    render(<MockNavbarMobile />);

    toggleUkrainianMobile();

    // check each option individually

    // language selector
    const languageGroupItem = screen.getByTestId("language-group-item");
    expect(languageGroupItem.innerHTML).toBe(uk.LANGUAGE);
    fireEvent.click(languageGroupItem);
    expect(screen.getByTestId("offcanvas-language-title").innerHTML).toBe(uk.LANGUAGE);

    // location selector
    expect(screen.getByTestId("location-group-item").innerHTML).toBe(uk.LOCATION);

    // dark mode
    expect(screen.getByTestId("darkmode-group-item").innerHTML).toBe(uk.DARK_MODE);
  });
});
