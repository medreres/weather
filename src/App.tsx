import { useContext, useState } from "react";
import { languageCtx } from "./shared/context/app-context";
import Weather from "./features/Weather/index";
import Navbar from "./features/Navbar/Navbar";

function App() {
  const { city } = useContext(languageCtx);
  const cityName = city.label.slice(0, city.label.indexOf(","));
  const [tempTable, setTempTable] = useState<[[string | number, string | number]]>();

  return (
    <>
      <Navbar cityName={cityName} />
      <Weather />
      {/* {tempTable &&
        createPortal(
          <Chart
            chartType="LineChart"
            data={tempTable}
            height="400px"
            loader={'hello'}
            // legendToggle
          />,
          document.querySelector("#curve_chart")!
        )} */}
    </>
  );
}

export default App;
