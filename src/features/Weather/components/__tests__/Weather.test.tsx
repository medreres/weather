import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LanguageContextProvider } from "../../../../shared/context/app-context";
import Weather from "../Weather";
import en from "../../../../shared/lang/english.json";
import uk from "../../../../shared/lang/ukrainian.json";
import Navbar from "../../../Navbar/components/Navbar";
import { toggleUkrainianDesktop } from "../../../../shared/utils/toggleUkrainian";
import { getDescription } from "../../utils/weatherCode";
import { normalizeDate } from "../../utils/formatting";

const MockWeather = () => {
  return (
    <LanguageContextProvider>
      <Navbar cityName="" />
      <Weather
        time={"Tue 17 Jan 2023"}
        weathercode={1}
        temp_min={0}
        temp_max={15}
        active={false}
        onClick={vi.fn()}
      />
    </LanguageContextProvider>
  );
};

describe("Weather", () => {
  it("renders description in English", () => {
    render(<MockWeather />);

    expect(screen.getByTestId("description").innerHTML).toBe(en.MAINLY_CLEAR);
  });

  it("render description in Ukrainian", () => {
    render(<MockWeather />);

    toggleUkrainianDesktop();

    expect(screen.getByTestId("description").innerHTML).toBe(uk.MAINLY_CLEAR);
  });

  it("renders min temp correctly", () => {
    const min_temp = 0;
    render(
      <Weather
        time={"Tue 17 Jan 2023"}
        weathercode={103}
        temp_min={min_temp}
        temp_max={15}
        active={false}
        onClick={vi.fn()}
      />
    );

    expect(screen.getByTestId("min-temp").innerHTML).toBe(min_temp + "˚");
  });

  it("renders max temp correctly", () => {
    const max_temp = 15;
    render(
      <Weather
        time={"Tue 17 Jan 2023"}
        weathercode={103}
        temp_min={0}
        temp_max={max_temp}
        active={false}
        onClick={vi.fn()}
      />
    );

    expect(screen.getByTestId("max-temp").innerHTML).toBe(max_temp + "˚");
  });

  it("renders weathercode correctly", () => {
    const weathercode = 1;
    render(
      <Weather
        time={"Tue 17 Jan 2023"}
        weathercode={weathercode}
        temp_min={0}
        temp_max={15}
        active={false}
        onClick={vi.fn()}
      />
    );

    expect(screen.getByTestId("description").innerHTML).toBe((en as any)[getDescription(weathercode)]);
  });
  it("renders date correctly", () => {
    const date = "17 Jan 2023";
    render(
      <Weather
        time={date}
        weathercode={103}
        temp_min={0}
        temp_max={15}
        active={false}
        onClick={vi.fn()}
      />
    );

    expect(screen.getByTestId("date").innerHTML).toBe(normalizeDate(date, "en"));
  });
});
