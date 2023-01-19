import React, { ReactNode, useEffect } from "react";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import useDarkmode from "../../features/Navbar/hooks/useDarkmode";
import useLanguge from "../hooks/useLanguge";
import useLocalStorage from "../hooks/useLocalStorage";
import { city } from "../../features/Weather/interface/weather";
import { LOCAL_STORAGE } from "../lang/translation";

const defaultLocalStorageCity = {
  label: "Lviv",
  value: {
    place_id: "ChIJV5oQCXzdOkcR4ngjARfFI0I",
    lat: 49.84,
    lng: 24.02,
  },
};

export const appCtx = React.createContext({
  lang: "en", // default values
  darkMode: false,
  tmpUnit: "c",
  setTmpUnit: (unit: string) => {},

  precipUnit: "mm",
  setPrecipUnit: (unit: string) => {},

  windspeedUnit: "kmh",
  setWindspeedUnit: (unit: string) => {},

  toggleDarkMode: () => {},
  setLanguage: (language: string) => {},
  setLatitude: (lat: number) => {},
  setLongtitude: (lnt: number) => {},
  latitude: 0,
  longitude: 0,
  city: {
    label: "Lviv",
    value: {
      description: "",
      place_id: "ChIJV5oQCXzdOkcR4ngjARfFI0I",
      lng: 49.84,
      lat: 24.02,
    },
  },
  setCity: (city: city) => {},
});

type languageContextProviderProps = {
  children: ReactNode;
};

// export const useLanguage = useContext(appCtx);
export function LanguageContextProvider({ children }: languageContextProviderProps) {
  const { lang, setLang } = useLanguge();
  const { darkMode, setDarkMode } = useDarkmode();
  const toggleDarkMode = () => setDarkMode((prevState: any) => !prevState);
  const [tmpUnit, setTmpUnit] = useLocalStorage(LOCAL_STORAGE.WEATHER_APP_UNITS_TEMPERATURE, "c");
  const [precipUnit, setPrecipUnit] = useLocalStorage(LOCAL_STORAGE.WEATHER_APP_UNITS_PRECIPITATION, "mm");
  const [windspeedUnit, setWindspeedUnit] = useLocalStorage(LOCAL_STORAGE.WEATHER_APP_UNITS_WIND_SPEED, "kmh");
  const [city, setCity] = useLocalStorage<city>(
    LOCAL_STORAGE.WEATHER_APP_CITY,
    // by default chose lviv as default location
    defaultLocalStorageCity
  );

  // set lang attribute
  useEffect(() => {
    document.querySelector("html")!.lang = lang;
  }, [lang]);

  const value = {
    darkMode,
    toggleDarkMode,
    lang,
    setLanguage: (lang: string) => {
      setLang(lang);
    },
    tmpUnit,
    setTmpUnit,
    precipUnit,
    setPrecipUnit,
    windspeedUnit,
    setWindspeedUnit,
    city,
    setCity: async (cityObj: city) => {
      // if searched through search bar, find the latitude and longitude
      if (!cityObj.value.lng && !cityObj.value.lng)
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
      // if pos given through geo api from browser, then all is set
      else setCity(cityObj);
    },
  };

  return <appCtx.Provider value={value as any}>{children}</appCtx.Provider>;
}