import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../api/api';
import useWeatherStore from '../store/WeatherStore';
import Navbar from './Navbar';
import WeatherData from '../types/WeatherData';
import { WeatherDataContainer, WeatherBackground } from './Styles';
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

function getWeatherImage(
  temp: number,
  rain: number | undefined,
  snow: number | undefined
): string {
  if (rain) {
    return 'asset/Rain-img.jpg';
  } else if (snow) {
    return 'asset/Snow-img.jpg';
  } else if (temp >= 28) {
    return 'asset/Hot-img.jpg';
  } else if (temp >= 23) {
    return 'asset/Warm-img.jpg';
  } else if (temp >= 12) {
    return 'asset/Fall-img.jpg';
  } else {
    return 'asset/Cold-img.jpg';
  }
}

export default function Weather() {
  const setWeatherData = useWeatherStore((state) => state.setWeatherData);
  const weatherData = useWeatherStore((state) => state.weatherData);
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    async function fetchData(cityName: string) {
      try {
        const data: WeatherData = await fetchWeatherData(cityName);
        setWeatherData(data);
        const backgroundImage = getWeatherImage(
          data.main.temp,
          data.rain?.['1h'],
          data.snow?.['1h']
        );
        setBackgroundImage(backgroundImage);
      } catch (error) {
        console.error('날씨 정보를 불러올 수 없습니다.', error);
      }
    }

    fetchData('서울');
  }, [setWeatherData]);

  return (
    <div>
      <Navbar />
      <WeatherBackground backgroundImage={backgroundImage}>
        {weatherData ? (
          <WeatherDataContainer>
            <h2>{transformCityName(weatherData.name)}</h2>
            <p>날씨: {weatherData.weather[0].description}</p>
            <p>온도: {weatherData.main.temp}°C</p>
            <p>습도: {weatherData.main.humidity}%</p>
            <p>기압: {weatherData.main.pressure} hPa</p>
            {weatherData.rain && <p>비 예측: {weatherData.rain['1h']}mm</p>}
            {weatherData.snow && <p>눈 예측: {weatherData.snow['1h']}mm</p>}
          </WeatherDataContainer>
        ) : (
          <p>날씨 정보를 불러오는 중입니다...</p>
        )}
      </WeatherBackground>
    </div>
  );
}
