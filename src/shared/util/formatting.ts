import { LOCAL_STORAGE } from "../translation";
import { languageCtx } from "./../context/language-context";
import { useContext } from "react";
export function getDay(date: string, lang?: string) {
  const time = new Date(date).toLocaleString(lang ? lang : "en", {
    weekday: "long",
  });

  return time;
}

export function normalizeTemp(value: number) {
  return Math.trunc(value);
}
