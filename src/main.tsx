import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { LanguageContextProvider } from "./shared/context/app-context";
import { registerSW } from "virtual:pwa-register";

if ("serviceWorker" in navigator) {
 
  registerSW();
}


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <LanguageContextProvider>
    <App />
  </LanguageContextProvider>
);