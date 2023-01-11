import React, { useContext } from "react";
import { TRANSLATION } from "../translation";
import uk from "../lang/ukrainian.json";
import en from "../lang/english.json";
import { languageCtx } from "../context/language-context";

export default function useLanguage() {
  const { lang } = useContext(languageCtx);
  function getLanguage() {
    switch (lang) {
      case "uk":
        return uk;

      case "en":
        return en;

      default:
        return en;
    }
  }
  function getTranslation(value: string) {
    switch (value) {
      // interface translation
      case TRANSLATION.LANGUAGE: {
        const currentLanguage = getLanguage();
        return (currentLanguage as any)[TRANSLATION.LANGUAGE];
      }
      case TRANSLATION.INTERFACE_LANGUAGE: {
        const currentLanguage = getLanguage();
        return (currentLanguage as any)[TRANSLATION.INTERFACE_LANGUAGE];
      }
      case TRANSLATION.UPDATEAD_AT: {
        const currentLanguage = getLanguage();
        return (currentLanguage as any)[TRANSLATION.UPDATEAD_AT];
      }
      case TRANSLATION.LOCATION_UNAVAILABLE: {
        const currentLanguage = getLanguage();
        return (currentLanguage as any)[TRANSLATION.LOCATION_UNAVAILABLE];
      }


      // weather translation©
      case TRANSLATION.CLEAR_SKY: {
        const currentLanguage = getLanguage();
        return (currentLanguage as any)[TRANSLATION.CLEAR_SKY];
      }
      case TRANSLATION.MAINLY_CLEAR: {
        const currentLanguage = getLanguage();
        return (currentLanguage as any)[TRANSLATION.MAINLY_CLEAR];
      }
      case TRANSLATION.MAINLY_CLEAR: {
        const currentLanguage = getLanguage();
        return (currentLanguage as any)[TRANSLATION.MAINLY_CLEAR];
      }
      case TRANSLATION.FOG: {
        const currentLanguage = getLanguage();
        return (currentLanguage as any)[TRANSLATION.FOG];
      }
      case TRANSLATION.DRIZZLE: {
        const currentLanguage = getLanguage();
        return (currentLanguage as any)[TRANSLATION.DRIZZLE];
      }
      case TRANSLATION.MAINLY_CLEAR: {
        const currentLanguage = getLanguage();
        return (currentLanguage as any)[TRANSLATION.MAINLY_CLEAR];
      }
      case TRANSLATION.FREEZING_DRIZZLE: {
        const currentLanguage = getLanguage();
        return (currentLanguage as any)[TRANSLATION.FREEZING_DRIZZLE];
      }
      case TRANSLATION.RAIN_SLIGHT: {
        const currentLanguage = getLanguage();
        return (currentLanguage as any)[TRANSLATION.RAIN_SLIGHT];
      }
      case TRANSLATION.RAIN_FREEZING: {
        const currentLanguage = getLanguage();
        return (currentLanguage as any)[TRANSLATION.RAIN_FREEZING];
      }
      case TRANSLATION.RAIN_SHOWERS_SLIGHT: {
        const currentLanguage = getLanguage();
        return (currentLanguage as any)[TRANSLATION.RAIN_SHOWERS_SLIGHT];
      }
      case TRANSLATION.THUNDERSTORM: {
        const currentLanguage = getLanguage();
        return (currentLanguage as any)[TRANSLATION.THUNDERSTORM];
      }
      case TRANSLATION.THUNDERSTORM_HAIL: {
        const currentLanguage = getLanguage();
        return (currentLanguage as any)[TRANSLATION.THUNDERSTORM_HAIL];
      }

      case TRANSLATION.SNOW_FALL: {
        const currentLanguage = getLanguage();
        return (currentLanguage as any)[TRANSLATION.SNOW_FALL];
      }
      case TRANSLATION.SNOW_GRAINS: {
        const currentLanguage = getLanguage();
        return (currentLanguage as any)[TRANSLATION.SNOW_GRAINS];
      }
      case TRANSLATION.SNOW_SHOWERS: {
        const currentLanguage = getLanguage();
        return (currentLanguage as any)[TRANSLATION.SNOW_SHOWERS];
      }

      default:
        break;
    }
  }
  return getTranslation;
}
