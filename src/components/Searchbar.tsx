import {
  faArrowRightToFile,
  faCheck,
  faCocktail,
  faCoffee,
  faFaceDizzy,
  faLocation,
  faPhoneSlash,
  faSlash,
  faSquare,
  faToiletPaperSlash,
  faWifi,
  faWifi3,
  faWifiStrong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import GooglePlacesAutocomplete, { geocodeByLatLng } from "react-google-places-autocomplete";
import { languageCtx } from "../shared/context/language-context";
import useLanguage from "../shared/hooks/useLanguage";
import { TRANSLATION } from "../shared/translation";
import wifiSlash from "../assets/wifi-slash.svg";

export default function Searchbar() {
  const [isLoading, setIsLoading] = useState(false);
  const translate = useLanguage();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    setIsOnline(navigator.onLine);
  }, [navigator.onLine]);

  // ask user for geo to find out where is he
  function getLocation() {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        geocodeByLatLng({ lat, lng })
          .then((results) => {
            const result = results[0];

            const city = {
              label: result.formatted_address,
              value: {
                place_id: result.place_id,
                lat,
                lng,
              },
            };
            setCity(city);
          })
          .catch((error) => {
            alert("Couldnt find your address");
          });

        setIsLoading(false);
      },
      (err) => {
        setIsLoading(false);
        alert(translate(TRANSLATION.LOCATION_UNAVAILABLE));
      }
    );
  }

  const { city, setCity, lang } = useContext(languageCtx);
  return (
    <Container
      fluid
      className="mb-2">
      <Row className="justify-content-center">
        <Col xs={5}>
          <GooglePlacesAutocomplete
            selectProps={{
              city,
              onChange: setCity,
              isDisabled: !isOnline,
            }}
            apiKey={import.meta.env.VITE_APP_GOOGLE_API_KEY}
            apiOptions={{
              language: lang,
            }}
            autocompletionRequest={{
              types: ["(cities)"],
            }}
          />
        </Col>
        <Col xs={1}>
          <Button
            disabled={isLoading || !isOnline}
            onClick={getLocation}>
            {!isLoading && <FontAwesomeIcon icon={faLocation} />}
            {isLoading && (
              <Spinner
                animation="border"
                variant="light"
                size="sm"
              />
            )}
            {!isOnline && (
              <img
                src={wifiSlash}
                alt="No Wifi"
                style={{
                  height: "32px",
                }}
              />
            )}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
