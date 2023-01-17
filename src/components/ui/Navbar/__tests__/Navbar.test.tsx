import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LanguageContextProvider } from "../../../../shared/context/language-context";
import { SMALL_SCREEN } from "../../../../shared/data/const";
import en from "../../../../shared/lang/english.json";
import uk from "../../../../shared/lang/ukrainian.json";
import Navbar from "../Navbar";
import { toggleUkrainianDesktop } from "./utils/toggleUkrainian";
import { mockDestkop, mockMobile } from "./utils/mockMedia";

const MockNavbar = () => {
  const cityName = "Sambir";
  return (
    <LanguageContextProvider>
      <Navbar cityName={cityName} />
    </LanguageContextProvider>
  );
};

describe("Navbar", () => {
  it("renders", () => {
    render(<Navbar cityName="" />);

    expect(screen.getByTestId("navbar")).toBeDefined();
  });

  it("renders brand in English (by default)", () => {
    render(<MockNavbar />);

    expect(screen.getByTestId("navbar-brand").innerHTML).toBe(en.WEATHER);
  });

  it("renders brand in Ukrainian", () => {
    // arrange
    render(<MockNavbar />);

    // act
    toggleUkrainianDesktop();

    // assert
    expect(screen.getByTestId("navbar-brand").innerHTML).toBe(uk.WEATHER);
  });

  it("renders mobile view", () => {
    // arrange
    mockMobile();

    render(<MockNavbar />);

    // assert
    expect(screen.getByTestId("navbar-mobile-toggler")).toBeDefined();
  });

  it("renders desktop view", () => {
    // arrange
    mockDestkop();
    render(<MockNavbar />);
    // assert
    expect(screen.getByTestId("navbar-desktop")).toBeDefined();
  });
});
