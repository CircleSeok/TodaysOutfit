import React, { useEffect, useState } from 'react';
import WeatherData from '../types/WeatherData';
import {
  WeatherDataContainer,
  WeatherBackground,
  WeatherDisplayContainer,
  WeatherInfo,
  CityandTemp,
  LeftBottomContainer,
  InputContainer,
  WeatherDetails,
} from './Styles';
import {
  transformCityName,
  getWeatherImage,
  getWeatherOutfit,
} from './WeatherUtils';
import useWeatherStore from '../store/WeatherStore';
import { fetchWeatherData } from '../api/api';
import { GiClothes } from 'react-icons/gi';
import { AiOutlineLogin } from 'react-icons/ai';

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const currentDate = new Date(); // 현재 날짜를 얻기 위해 Date 객체를 사용

  const [cityName, setCityName] = useState<string>(''); // 도시 이름을 입력받을 상태

  const setWeatherData = useWeatherStore((state) => state.setWeatherData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await fetchWeatherData(cityName || '서울');
      setWeatherData(data);
    } catch (error) {
      console.error('날씨 정보를 불러올 수 없습니다.', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

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
          <InputContainer>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='SEARCH'
                value={cityName}
                onChange={handleChange}
              />
            </form>
          </InputContainer>
          <WeatherDetails>
            <h4>Weather Deatails</h4>
            <div>
              <p>Max/Min Temp</p>
              <p>
                {weatherData.main.temp_max}°C/
                {weatherData.main.temp_min}°C
              </p>
            </div>
            <div>
              <p>Humidity</p>
              <p> {weatherData.main.humidity}%</p>
            </div>
            {weatherData.wind && (
              <div>
                <p>Wind</p>
                <p>{weatherData.wind.speed} m/s</p>
              </div>
            )}
            {/* {weatherData.rain && <p>Rain {weatherData.rain['1h']}mm</p>}
            {weatherData.snow && <p>Snow {weatherData.snow['1h']}mm</p>} */}
            <div>
              <p>
                <GiClothes />
              </p>
              <p>
                <AiOutlineLogin />
              </p>
              {/* <p> {getWeatherOutfit(weatherData.main.temp)}</p> */}
            </div>
          </WeatherDetails>
        </WeatherDataContainer>
      </WeatherBackground>
    </WeatherDisplayContainer>
  );
};

export default WeatherDisplay;
