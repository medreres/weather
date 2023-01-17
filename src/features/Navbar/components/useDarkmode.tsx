import React, { useEffect } from "react";
import { LOCAL_STORAGE } from "../../../shared/lang/translation";
import useLocalStorage from "../../../shared/hooks/useLocalStorage";

export default function useDarkmode() {
  const [darkMode, setDarkMode] = useLocalStorage(LOCAL_STORAGE.WEATHER_APP_DARK_MODE, false);

  useEffect(() => {
    const html = document.querySelector("html");

    darkMode ? html?.setAttribute("data-bs-theme", "dark") : html?.setAttribute("data-bs-theme", "light");
  }, [darkMode]);

  return { darkMode, setDarkMode };
}
