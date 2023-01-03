import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { getIcon, getDescription } from "../../weatherCode";
import useLanguage from "../shared/hooks/useLanguage";
import { normalizeTemp } from "../shared/util/formatting";

type WeatherTodayProps = {
  weathercode: number;
  temperature: number;
  cityName: string;
};

export default function WeatherToday({
  weathercode,
  temperature,
  cityName
}: WeatherTodayProps) {
  const translate = useLanguage();
  return (
    <div className="w-100 text-center">
      <h1>{cityName}</h1>
      <h2
        style={{
          fontSize: "13vmin",
        }}
      >
        <FontAwesomeIcon icon={getIcon(weathercode)} />{" "}
        {normalizeTemp(temperature)}˚C
      </h2>
      <h5>{translate(getDescription(weathercode))}</h5>
    </div>
  );
}
