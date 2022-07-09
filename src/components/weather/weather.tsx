import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectLocation } from "./locationSlice";
import { getWeather, selectWeather } from "./weatherSlice";
import {
  Row,
  Col,
  Alert,
  Card,
} from "react-bootstrap";
import { CustomLoading } from "./customLoading";

export function Weather() {

    // User location fetched from the browser
    // and stored in the state

  const location = useAppSelector(selectLocation);
  const weather = useAppSelector(selectWeather);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (location.locationInfo) {
      dispatch(getWeather(location.locationInfo));
    }
  }, [location, dispatch]);

  const iconUrl =
    "http://openweathermap.org/img/w/" + weather.weatherInfo?.icon + ".png";

  if (location.status === "failed" || weather.status === "failed") {
    return (
      <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{weather.error}</p>
      </Alert>
    );
  }
  if (location.status === "loaded" && weather.status === "loaded") {


  // Using Row , Card from react-bootstrap 

    return (
      <div>
        <Row>
          {location.error && <h1>{location.error}</h1>}
          {!location.error && (
            <Col md={2} sm={12}>
              <Card>
                <Card.Body className="text-center">
                  <Card.Title className="h1">Weather Info</Card.Title>
                  <Card.Img className="text-center"
                    variant="top"
                    src={iconUrl}
                    style={{ height: 100, width: 100 }}
                  />
                  <Card.Text>{weather.weatherInfo?.place}</Card.Text>
                  <Card.Text>{weather.weatherInfo?.main}</Card.Text>
                  <Card.Text>Humidity : {weather.weatherInfo?.humidity}</Card.Text>
                  <Card.Text>Max Temp : {weather.weatherInfo?.temp_max}°C</Card.Text>
                  <Card.Text>Min Temp : {weather.weatherInfo?.temp_min}°C</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    );
  }

  return CustomLoading("weather data");
}
