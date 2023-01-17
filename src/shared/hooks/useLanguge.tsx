import React from "react";
import { LOCAL_STORAGE } from "../lang/translation";
import useLocalStorage from "./useLocalStorage";

export default function useLanguge() {
  const [lang, setLang] = useLocalStorage(LOCAL_STORAGE.WEATHER_APP_LANGUAGE, "en");
  
  return { lang, setLang };
}
