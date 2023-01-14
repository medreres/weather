import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { LanguageContextProvider } from "./shared/context/language-context";
import "./styles.css";
import { registerSW } from "virtual:pwa-register";

if ("serviceWorker" in navigator) {
  // && !/localhost/.test(window.location)) {
  // console.log(caches.keys());
  registerSW();
} else {
  console.log("no");
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <LanguageContextProvider>
    <App />
  </LanguageContextProvider>
);
