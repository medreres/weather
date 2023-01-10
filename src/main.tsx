import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { LanguageContextProvider } from "./shared/context/language-context";
import "./styles.css";
import { registerSW } from "virtual:pwa-register";

if ("serviceWorker" in navigator && !/localhost/.test(window.location as any)) {
  // && !/localhost/.test(window.location)) {
  registerSW();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <LanguageContextProvider>
    <App />
  </LanguageContextProvider>
);
