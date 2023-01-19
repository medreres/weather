import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Placeholder, Table } from "react-bootstrap";
import { getIcon, getDescription } from "../../utils/weatherCode";
import useLanguage from "../../../../shared/hooks/useTranslation";
// import styles from "./WeatherPlaceholder.module.css";
import styles from "../WeatherToday.module.css";
import { appCtx } from "../../../../shared/context/app-context";

export default function WeatherTodayPlaceholder() {
  const { darkMode } = useContext(appCtx);
  return (
    <div className={styles["weather-today"]}>
      <Placeholder
        as="h1"
        animation="glow">
        <Placeholder xs={3} />
      </Placeholder>
      <Placeholder
        as="h2"
        animation="glow"
        style={{
          fontSize: "13vmin",
        }}>
        <Placeholder xs={1} /> <Placeholder style={{ width: "5%" }} /> <Placeholder style={{ width: "5%" }} />
      </Placeholder>
      <Placeholder
        as="h5"
        animation="glow"
        className={styles["weather-description"]}>
        <Placeholder xs={3} />
      </Placeholder>

      <Table
        className={styles["weather-table"]}
        striped
        borderless
        variant={darkMode ? "dark" : ""}
        size="sm">
        <tbody>
          <tr>
            <td className="placeholder-glow">
              <Placeholder xs={2} /> <Placeholder xs={2} />
            </td>
            <td className="placeholder-glow">
              <Placeholder xs={1} /> <Placeholder xs={3} />
            </td>
          </tr>
          <tr>
            <td className="placeholder-glow">
              <Placeholder xs={3} /> <Placeholder xs={1} />
            </td>
            <td className="placeholder-glow">
              <Placeholder xs={1} /> <Placeholder xs={1} />
              <Placeholder xs={1} /> <Placeholder xs={1} />
            </td>
          </tr>
          <tr>
            <td className="placeholder-glow">
              <span className="placeholder col-3"></span>
            </td>
            <td className="placeholder-glow">
              <Placeholder xs={1} /> <Placeholder xs={1} />
            </td>
          </tr>
        </tbody>
      </Table>

      <Placeholder
        as="p"
        animation="glow">
        <Placeholder xs={1} />{" "}
        <Placeholder
          className="ms-2"
          xs={1}
        />{" "}
        <Placeholder
          className="ms-2"
          xs={1}
        />
      </Placeholder>
    </div>
  );
}
