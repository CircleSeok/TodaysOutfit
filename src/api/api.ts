import axios from 'axios';

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const mapKey = process.env.REACT_APP_MAP_BOX_API_KEY;

export async function fetchWeatherData(cityName: string) {
  try {
    const mapboxResponse = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=${mapKey}`
    );
    const coordinates = mapboxResponse.data.features[0].center;
    const latitude = coordinates[1];
    const longitude = coordinates[0];

    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    );

    return weatherResponse.data;
  } catch (error) {
    throw error;
  }
}
