import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { getIcon, getDescription } from "../../weatherCode";
import { languageCtx } from "../shared/context/language-context";
import useLanguage from "../shared/hooks/useLanguage";
import { TRANSLATION } from "../shared/translation";
import { normalizeTemp } from "../shared/util/formatting";

type WeatherTodayProps = {
  weathercode: number;
  temperature: number;
  cityName: string;
  updatedAt: string;
};

export default function WeatherToday({ weathercode, temperature, cityName, updatedAt }: WeatherTodayProps) {
  const translate = useLanguage();
  const { lang } = useContext(languageCtx);

  return (
    <div className="w-100 text-center">
      <h1>{cityName}</h1>
      <h2
        style={{
          fontSize: "13vmin",
        }}>
        <FontAwesomeIcon icon={getIcon(weathercode)} /> {normalizeTemp(temperature)}˚C
      </h2>
      <h5>{translate(getDescription(weathercode))}</h5>
      <p className="text-secondary">
        {translate(TRANSLATION.UPDATEAD_AT)}:{" "}
        <span>
          {new Date(updatedAt).toLocaleString(lang, {
            weekday: "long",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "numeric",
          })}
        </span>
      </p>
    </div>
  );
}
