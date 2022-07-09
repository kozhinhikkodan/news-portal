import { LocationInfo } from "./locationSlice";
import { WeatherInfo } from "./weatherSlice";
import axios from "axios";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

// Function to fetch weather data from openweathermap.org
export function fetchWeather(location: LocationInfo) {

    return new Promise<{ data: WeatherInfo }>((resolve, reject) => {

        axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`)       
            .then(
                (result) => {
                    if (result.status === 200) {
                        var weatherInfo = {
                            main: result.data.weather[0].main,
                            icon: result.data.weather[0].icon,
                            place: result.data.name,
                            temp: result.data.main.temp,
                            feels_like: result.data.main.feels_like,
                            temp_min: result.data.main.temp_min,
                            temp_max: result.data.main.temp_max,
                            pressure: result.data.main.pressure,
                            humidity: result.data.main.humidity,
                        }
                        resolve({ data: weatherInfo })
                    }
                    else {
                        reject(new Error("Could not retrieve weather data"))
                    }
                },
                (error) => {
                    reject(new Error("Could not retrieve weather data"))
                }
            )


        
    }
    );
}