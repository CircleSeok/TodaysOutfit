import React, { useState, useEffect, FormEvent } from 'react';
import { fetchWeatherData } from '../api/api';
import './Weather.css';
import { GiClothes } from 'react-icons/gi';
import useWeatherStore from '../store/WeatherStore';
import WeatherData from '../types/WeatherData';

// 도시 이름을 변환하는 함수
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
  const [cityName, setCityName] = useState<string>('서울');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    handleSubmit({
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>);
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
