import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../api/api';
import './Weather.css';
import { GiClothes } from 'react-icons/gi';
import useWeatherStore from '../store/WeatherStore';
import WeatherData from '../types/WeatherData';

export default function Weather() {
  const setWeatherData = useWeatherStore((state) => state.setWeatherData);
  const [cityName, setCityName] = useState<string>('서울');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchWeatherData(cityName);
        setWeatherData(data);
      } catch (error) {
        console.error('날씨 정보를 불러올 수 없습니다.', error);
      }
    }

    if (cityName) {
      fetchData();
    }
  }, [cityName, setWeatherData]);

  const weatherData: WeatherData | null = useWeatherStore(
    (state) => state.weatherData
  );

  return (
    <div>
      <nav className='navbar'>
        <div className='navbar-left'>
          <h1>오늘 뭐 입지?</h1>
        </div>
        <div className='navbar-middle'>
          <input
            type='text'
            placeholder='도시 이름을 입력하세요'
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className='navbar-right'>
          <GiClothes />
        </div>
      </nav>
      {weatherData ? (
        <div>
          <h2>{weatherData.name}</h2>
          <p>날씨: {weatherData.weather[0].description}</p>
          <p>온도: {weatherData.main.temp}°C</p>
          <p>습도: {weatherData.main.humidity}%</p>
          <p>기압: {weatherData.main.pressure} hPa</p>
        </div>
      ) : (
        <p>날씨 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
}
