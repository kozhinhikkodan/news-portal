import { LocationInfo } from "./locationSlice";
import { WeatherInfo } from "./weatherSlice";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

// Function to fetch weather data from openweathermap.org
export function fetchWeather(location: LocationInfo) {

    return new Promise<{ data: WeatherInfo }>((resolve, reject) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.cod === 200) {
                        var weatherInfo = {
                            main: result.weather[0].main,
                            icon: result.weather[0].icon,
                            place: result.name,
                            temp: result.main.temp,
                            feels_like: result.main.feels_like,
                            temp_min: result.main.temp_min,
                            temp_max: result.main.temp_max,
                            pressure: result.main.pressure,
                            humidity: result.main.humidity,
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