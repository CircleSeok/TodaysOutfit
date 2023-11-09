import React, { useEffect } from 'react';
import useWeatherStore from '../store/WeatherStore';
import WeatherData from '../types/WeatherData';
import WeatherDisplay from './WeatherDisplay';
import { fetchWeatherData } from '../api/api';
export default function Weather() {
  const setWeatherData = useWeatherStore((state) => state.setWeatherData);

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
      <WeatherDisplay />
    </div>
  );
}
