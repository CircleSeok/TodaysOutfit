import React, { useState, useEffect, FormEvent } from 'react';
import { fetchWeatherData } from '../api/api';
import './Weather.css';
import { GiClothes } from 'react-icons/gi';
import useWeatherStore from '../store/WeatherStore';
import WeatherData from '../types/WeatherData';

export default function Weather() {
  const setWeatherData = useWeatherStore((state) => state.setWeatherData);
  const [cityName, setCityName] = useState<string>('서울');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 제출 동작 방지
    try {
      const data = await fetchWeatherData(cityName);
      setWeatherData(data);
    } catch (error) {
      console.error('날씨 정보를 불러올 수 없습니다.', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };
  useEffect(() => {
    // 초기 로딩 시에도 데이터를 불러올 수 있도록 합니다.
    handleSubmit({} as React.FormEvent<HTMLFormElement>);
  }, [setWeatherData]);

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
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='도시 이름을 입력하세요'
              value={cityName}
              onChange={handleChange}
            />
          </form>
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
