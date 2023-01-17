import { describe, expect, it, MockedFunction, vi, vitest } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Fallback from "../Fallback";
import { LanguageContextProvider } from "../../../features/Weather/context/language-context";
import en from "../../../shared/lang/english.json";
import uk from "../../../shared/lang/ukrainian.json";
import Navbar from "../../../features/Navbar/components/Navbar";

const MockFallback = () => {
  return (
    <LanguageContextProvider>
      <Fallback />
    </LanguageContextProvider>
  );
};

describe("Fallback component", () => {
  it("renders", () => {
    render(<Fallback />);

    expect(screen.getByTestId("fallback-component")).toBeDefined();
  });

  it("renders text in English (by default)", () => {
    //arrange
    render(<MockFallback />);

    // assert
    expect(screen.getByTestId("fallback-header").innerHTML).toEqual(en.ERROR);
    expect(screen.getByTestId("fallback-title").innerHTML).toEqual(en.OUT_OF_DATE);
    expect(screen.getByTestId("fallback-text").innerHTML).toEqual(en.EXPIRED);
    expect(screen.getByTestId("fallback-reload-button").innerHTML).toEqual(en.RELOAD);
  });

  it("renders text in Ukrainian", () => {
    // arrange
    render(
      <LanguageContextProvider>
        <Navbar cityName="Lviv" />
        <Fallback />
      </LanguageContextProvider>
    );

    // act
    fireEvent.click(screen.getByTestId("language-dropdown"));
    fireEvent.click(screen.getByTestId("toggle-uk"));

    // assert
    expect(screen.getByTestId("fallback-header").innerHTML).toEqual(uk.ERROR);
    expect(screen.getByTestId("fallback-title").innerHTML).toEqual(uk.OUT_OF_DATE);
    expect(screen.getByTestId("fallback-text").innerHTML).toEqual(uk.EXPIRED);
    expect(screen.getByTestId("fallback-reload-button").innerHTML).toEqual(uk.RELOAD);
  });

   
});
