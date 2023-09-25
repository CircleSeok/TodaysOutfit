import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherData {
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
}

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const mapKey = process.env.REACT_APP_MAP_BOX_API_KEY;
  const [cityName, setCityName] = useState<string>('서울'); // 기본값을 '서울'로 설정

  useEffect(() => {
    if (cityName) {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=${mapKey}`
        )
        .then((response) => {
          console.log(response);
          const coordinates = response.data.features[0].center;
          const latitude = coordinates[1];
          const longitude = coordinates[0];

          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
            )
            .then((weatherResponse) => {
              const data: WeatherData = weatherResponse.data;
              setWeatherData(data);
            })
            .catch((error) => {
              console.error('날씨 정보를 불러올 수 없습니다.', error);
            });
        })
        .catch((error) => {
          console.error('위치 정보를 찾을 수 없습니다.', error);
        });
    }
  }, [cityName]);

  return (
    <div>
      <h1>도시 날씨 검색</h1>
      <input
        type='text'
        placeholder='도시 이름을 입력하세요'
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      {weatherData ? (
        <div>
          <h2>{weatherData.name}</h2>
          {/* {weatherData.name}  {cityName}*/}
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
