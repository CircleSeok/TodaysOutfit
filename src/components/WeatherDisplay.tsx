import React, { useEffect, useState } from 'react';
import WeatherData from '../types/WeatherData';
import {
  WeatherDataContainer,
  WeatherBackground,
  WeatherDisplayContainer,
  WeatherInfo,
  CityandTemp,
  LeftBottomContainer,
} from './Styles';
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
  const currentDate = new Date(); // 현재 날짜를 얻기 위해 Date 객체를 사용

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

  const getDayOfWeek = (date: any) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dayIndex = date.getDay();
    return days[dayIndex];
  };

  return (
    <WeatherDisplayContainer>
      <WeatherBackground backgroundImage={backgroundImage}>
        <WeatherInfo>
          <p>
            {currentDate.getFullYear()} {currentDate.getMonth() + 1}{' '}
            {currentDate.getDate()} ,{getDayOfWeek(currentDate)}
          </p>
          <LeftBottomContainer>
            <CityandTemp>
              <h2>{weatherData.main.temp}°C</h2>
              <h1>{city}</h1>
            </CityandTemp>
          </LeftBottomContainer>
        </WeatherInfo>
        <WeatherDataContainer>
          <p>
            최고/최저 온도 :{weatherData.main.temp_max}°C/
            {weatherData.main.temp_min}°C
          </p>
          <p>습도: {weatherData.main.humidity}%</p>
          {weatherData.wind && <p>바람: {weatherData.wind.speed} m/s</p>}
          {weatherData.rain && <p>비 예측: {weatherData.rain['1h']}mm</p>}
          {weatherData.snow && <p>눈 예측: {weatherData.snow['1h']}mm</p>}
          <p>옷차림: {getWeatherOutfit(weatherData.main.temp)}</p>
        </WeatherDataContainer>
      </WeatherBackground>
    </WeatherDisplayContainer>
  );
};

export default WeatherDisplay;
