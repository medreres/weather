import React, { Children, ReactNode, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const languageCtx = React.createContext({
  lang: "uk",
  setLanguage: (language: string) => {},
});

type languageContextProviderProps = {
  children: ReactNode;
};

// export const useLanguage = useContext(languageCtx);

export function LanguageContextProvider({
  children,
}: languageContextProviderProps) {
  const [lang, setLang] = useLocalStorage("WEATHER_APP_LANGUAGE", "en");
  const value = {
    lang,
    setLanguage: (lang: string) => {
      setLang(lang);
    },
  };

  return <languageCtx.Provider value={value}>{children}</languageCtx.Provider>;
}
