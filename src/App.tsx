import { useContext, useState } from "react";
import { languageCtx } from "./shared/context/app-context";
import Weather from "./features/Weather";
import Navbar from "./features/Navbar";

function App() {
  const { city } = useContext(languageCtx);
  const cityName = city.label.slice(0, city.label.indexOf(","));

  return (
    <>
      <Navbar cityName={cityName} />
      <Weather />
    </>
  );
}

export default App;
