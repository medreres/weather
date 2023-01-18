import React, { useContext } from "react";
import uk from "../lang/ukrainian.json";
import en from "../lang/english.json";
import { languageCtx } from "../context/app-context";

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
    const currentLanguage = getLanguage();
    return (currentLanguage as any)[value];
  }
  return getTranslation;
}
