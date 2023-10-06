import React, { useEffect, useState } from 'react';
import WeatherData from '../types/WeatherData';
import { WeatherDataContainer, WeatherBackground } from './Styles';
import {
  transformCityName,
  getWeatherImage,
  getWeatherOutfit,
} from './WeatherUtils';

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    if (weatherData) {
      const temp = weatherData.main.temp;
      const rain = weatherData.rain?.['1h'];
      const snow = weatherData.snow?.['1h'];
      const image = getWeatherImage(temp, rain, snow);
      setBackgroundImage(image);
    }
  }, [weatherData]);

  if (!weatherData) {
    return <p>날씨 정보를 불러오는 중입니다...</p>;
  }

  const city = transformCityName(weatherData.name);

  return (
    <WeatherBackground backgroundImage={backgroundImage}>
      <WeatherDataContainer>
        <h2>{city}</h2>
        <p>날씨: {weatherData.weather[0].description}</p>
        <p>온도: {weatherData.main.temp}°C</p>
        <p>습도: {weatherData.main.humidity}%</p>
        <p>기압: {weatherData.main.pressure} hPa</p>
        {weatherData.rain && <p>비 예측: {weatherData.rain['1h']}mm</p>}
        {weatherData.snow && <p>눈 예측: {weatherData.snow['1h']}mm</p>}
        <p>옷차림: {getWeatherOutfit(weatherData.main.temp)}</p>
      </WeatherDataContainer>
    </WeatherBackground>
  );
};

export default WeatherDisplay;
