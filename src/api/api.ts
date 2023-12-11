import axios from 'axios';

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const mapKey = process.env.REACT_APP_MAP_BOX_API_KEY;

export async function fetchWeatherData(cityName: string) {
  try {
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
    );

    return weatherResponse.data;
  } catch (error) {
    throw error;
  }
}
