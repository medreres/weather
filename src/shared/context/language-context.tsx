import React, { Children, ReactNode, useContext, useState } from "react";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import useLocalStorage from "../hooks/useLocalStorage";
import { city } from "../interfaces/weather";
import { LOCAL_STORAGE } from "../translation";

export const languageCtx = React.createContext({
  lang: "uk",
  setLanguage: (language: string) => {},
  setLatitude: (lat: number) => {},
  setLongtitude: (lnt: number) => {},
  latitude: 0,
  longitude: 0,
  city: {
    label: "",
    value: {
      description: "",
      place_id: "",
      lng: 0,
      lat: 0,
    },
  },
  setCity: (city: city) => {},
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
  const [city, setCity] = useLocalStorage<city>(
    LOCAL_STORAGE.WEATHER_APP_CITY,
    // by default chose lviv as default location
    {
      label: "Lviv",
      value: {
        description: "Lviv, Lviv Oblast, Ukraine",
        place_id: "ChIJV5oQCXzdOkcR4ngjARfFI0I",
        lat: 49.84,
        lng: 24.02,
      },
    }
  );
  const value = {
    lang,
    setLanguage: (lang: string) => {
      setLang(lang);
    },
    city,
    setCity: async (cityObj: city) => {
      geocodeByPlaceId(city.value.place_id).then((res) => {
        const city = res[0];
        const lat = city.geometry.location.lat();
        const lng = city.geometry.location.lng();
        setCity({
          ...cityObj,
          value: {
            ...cityObj.value,
            lat,
            lng,
          },
        });
      });
    },
  };

  return <languageCtx.Provider value={value}>{children}</languageCtx.Provider>;
}
