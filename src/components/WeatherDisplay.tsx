import React, { useCallback, useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../api/firebase';

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const currentDate = new Date();
  const [cityName, setCityName] = useState<string>('');
  const setWeatherData = useWeatherStore((state) => state.setWeatherData);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const data = await fetchWeatherData(cityName || '서울');
        setWeatherData(data);
      } catch (error) {
        console.error('날씨 정보를 불러올 수 없습니다.', error);
      }
    },
    [cityName, setWeatherData]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  }, []);

  const ClothesClick = () => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        navigate('/clothes');
      } else {
        navigate('/signup');
      }
    });
  };

  const SignupClick = () => {
    navigate('/signup');
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

  const limitElements = (elements: string[], limit: number) => {
    if (elements.length > limit) {
      return elements.slice(0, limit).join(', ') + '...';
    } else {
      return elements.join(', ');
    }
  };

  const outfit = getWeatherOutfit(weatherData.main.temp).split(', ');
  const displayedOutfit = limitElements(outfit, 4);

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
              {/* <p>
                <GiClothes onClick={ClothesClick} />
              </p>
              <p>
                <AiOutlineLogin onClick={SignupClick} />
              </p> */}
              <p> {displayedOutfit}</p>
            </div>
          </WeatherDetails>
        </WeatherDataContainer>
      </WeatherBackground>
    </WeatherDisplayContainer>
  );
};

export default WeatherDisplay;
