import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import GooglePlacesAutocomplete, { geocodeByLatLng } from "react-google-places-autocomplete";
import { languageCtx } from "../shared/context/language-context";
import useLanguage from "../shared/hooks/useLanguage";
import { TRANSLATION } from "../shared/translation";

export default function Searchbar() {
  const [isLoading, setIsLoading] = useState(false);
  const translate = useLanguage();
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
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={6}>
          <GooglePlacesAutocomplete
            selectProps={{
              city,
              onChange: setCity,
            }}
            apiKey="AIzaSyCCbZQu78ae-hjPy0CgYcOer7stF_rgMYo"
            apiOptions={{
              language: lang,
            }}
            // autocompletionRequest={{
            //   types: ["(cities)"],
            // }}
          />
        </Col>
        <Col xs={1}>
          <Button
            disabled={isLoading}
            onClick={getLocation}>
            {!isLoading && <FontAwesomeIcon icon={faLocation} />}
            {isLoading && (
              <Spinner
                animation="border"
                variant="light"
                size="sm"
              />
            )}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
