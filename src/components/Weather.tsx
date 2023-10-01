import React, { useEffect } from 'react';
import { fetchWeatherData } from '../api/api';
import './Weather.css';
import useWeatherStore from '../store/WeatherStore';
import Navbar from './Navbar';
import WeatherData from '../types/WeatherData';

function transformCityName(cityName: string): string {
  const cityMappings: { [key: string]: string } = {
    seoul: '서울',
    busan: '부산',
    incheon: '인천',
    daegu: '대구',
    ulsan: '울산',
    suwon: '수원',
    daejeon: '대전',
  };

  return cityMappings[cityName.toLowerCase()] || cityName;
}

export default function Weather() {
  const setWeatherData = useWeatherStore((state) => state.setWeatherData);
  const weatherData = useWeatherStore((state) => state.weatherData);

  useEffect(() => {
    async function fetchData(cityName: string) {
      try {
        const data: WeatherData = await fetchWeatherData(cityName);
        setWeatherData(data);
      } catch (error) {
        console.error('날씨 정보를 불러올 수 없습니다.', error);
      }
    }

    fetchData('서울');
  }, [setWeatherData]);

  return (
    <div>
      <Navbar />
      {weatherData ? (
        <div>
          <h2>{transformCityName(weatherData.name)}</h2>
          <p>날씨: {weatherData.weather[0].description}</p>
          <p>온도: {weatherData.main.temp}°C</p>
          <p>습도: {weatherData.main.humidity}%</p>
          <p>기압: {weatherData.main.pressure} hPa</p>
          {weatherData.rain && <p>비 예측: {weatherData.rain['1h']}mm</p>}
          {weatherData.snow && <p>눈 예측: {weatherData.snow['1h']}mm</p>}
        </div>
      ) : (
        <p>날씨 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
}
