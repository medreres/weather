import React, { ReactNode, useEffect } from "react";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import useDarkmode from "../../Navbar/components/useDarkmode";
import useLanguge from "../../../shared/hooks/useLanguge";
import useLocalStorage from "../../../shared/hooks/useLocalStorage";
import { city } from "../../../shared/interfaces/weather";
import { LOCAL_STORAGE } from "../../../shared/lang/translation";

export const languageCtx = React.createContext({
  lang: "en", // default values
  darkMode: false,
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

// export const useLanguage = useContext(languageCtx);

export function LanguageContextProvider({ children }: languageContextProviderProps) {
  const { lang, setLang } = useLanguge();
  const { darkMode, setDarkMode } = useDarkmode();

  const toggleDarkMode = () => setDarkMode((prevState: any) => !prevState);

  const [city, setCity] = useLocalStorage<city>(
    LOCAL_STORAGE.WEATHER_APP_CITY,
    // by default chose lviv as default location
    {
      label: "Lviv",
      value: {
        place_id: "ChIJV5oQCXzdOkcR4ngjARfFI0I",
        lat: 49.84,
        lng: 24.02,
      },
    }
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
    city,
    setCity: async (cityObj: city) => {
      // if searched thrugh search bar, find the latitude and longitude
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

  return <languageCtx.Provider value={value as any}>{children}</languageCtx.Provider>;
}
