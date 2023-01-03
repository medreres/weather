import React, { Children, ReactNode, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { LOCAL_STORAGE } from "../translation";

export const languageCtx = React.createContext({
  lang: "uk",
  setLanguage: (language: string) => {},
  setLatitude: (lat: number) => {},
  setLongtitude: (lnt: number) => {},
  latitude: 0,
  longitude: 0,
});

type languageContextProviderProps = {
  children: ReactNode;
};

// export const useLanguage = useContext(languageCtx);

export function LanguageContextProvider({
  children,
}: languageContextProviderProps) {
  const [lang, setLang] = useLocalStorage(
    LOCAL_STORAGE.WEATHER_APP_LANGUAGE,
    "en"
  );
  const [lat, setLat] = useLocalStorage(LOCAL_STORAGE.WEATHER_APP_LATITUDE, 0);
  const [lnt, setLnt] = useLocalStorage(LOCAL_STORAGE.WEATHER_APP_LONGITUDE, 0);
  const value = {
    lang,
    setLanguage: (lang: string) => {
      setLang(lang);
    },
    setLatitude: setLat,
    setLongtitude: setLnt,
    latitude: lat,
    longitude: lnt,
  };

  return <languageCtx.Provider value={value}>{children}</languageCtx.Provider>;
}
