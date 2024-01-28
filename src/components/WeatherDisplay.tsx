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
  DownBtn,
  DateandUser,
  Test,
  StyledLogoutIcon,
  StyledLoginIcon,
} from './Styles';
import {
  // transformCityName,
  getWeatherImage,
  getWeatherOutfit,
} from './WeatherUtils';
import useWeatherStore from '../store/WeatherStore';
import { fetchWeatherData } from '../api/api';
import { GiClothes } from 'react-icons/gi';
import { AiOutlineLogin } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  auth,
  getWeatherImageFromFirestore,
  signOutUser,
} from '../api/firebase';
import { scroller } from 'react-scroll';
import { FaAngleDoubleDown } from 'react-icons/fa';
import { IoLogOutSharp, IoLogInSharp } from 'react-icons/io5';
import ModalStore from '../store/ModalStore';
interface WeatherDisplayProps {
  weatherData: WeatherData | null;
}

const WeatherDisplay: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const currentDate = new Date();
  const [cityName, setCityName] = useState<string>('');
  // const [user, setUser] = useState<User | null>(null);
  const setWeatherData = useWeatherStore((state) => state.setWeatherData);
  const navigate = useNavigate();
  const weatherData = useWeatherStore((state) => state.weatherData);
  const setUser = useWeatherStore((state) => state.setUser);
  const user = useWeatherStore((state) => state.user);
  const isModalOpen = ModalStore((state) => state.isModalOpen);
  const setModalOpen = ModalStore((state) => state.setIsModalOpen);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const data = await fetchWeatherData(cityName);
        // console.log('Weather API Response:', data);
        setWeatherData(data);
      } catch (error) {
        // console.error('날씨 정보를 불러올 수 없습니다.', error);
      }
    },
    [cityName, setWeatherData]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  }, []);

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.log(error);
    }
  };
  const openModal = () => {
    const currentuser = auth.currentUser;

    setModalOpen(true);
  };
  // const SignupClick = () => {
  //   navigate('/signup');
  // };

  useEffect(() => {
    // ...

    const fetchData = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setUser(user);
      });

      if (weatherData) {
        const temp = weatherData.main.temp;
        const rain = weatherData.rain?.['1h'];
        const snow = weatherData.snow?.['1h'];

        try {
          const image = await getWeatherImageFromFirestore(temp, rain, snow);
          // null 체크를 수행하고 이미지가 있다면 setBackgroundImage에 전달합니다.
          if (image !== null) {
            setBackgroundImage(image);
            console.log(image);
          } else {
            // 이미지가 null인 경우에는 기본 이미지를 설정합니다.
            setBackgroundImage('기본/image-url.jpg');
          }
        } catch (error) {
          console.error('배경 이미지를 가져오는 중 오류 발생:', error);
          setBackgroundImage('기본/image-url.jpg');
        }
      }

      return () => unsubscribe();
    };

    fetchData();
  }, [weatherData, setBackgroundImage, setUser]);

  if (!weatherData) {
    return <p>날씨 정보를 불러오는 중입니다...</p>;
  }

  // const city = transformCityName(weatherData.name);

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

  const outfit = getWeatherOutfit(weatherData.main.temp);
  const displayedOutfit = limitElements(outfit, 4);

  const handleClothesButtonClick = () => {
    scroller.scrollTo('clothes', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <WeatherDisplayContainer>
      <WeatherBackground backgroundimage={backgroundImage}>
        <WeatherInfo>
          <DateandUser>
            <p>
              {currentDate.getFullYear()} {currentDate.getMonth() + 1}{' '}
              {currentDate.getDate()} ,{getDayOfWeek(currentDate)}
            </p>
            <Test>
              {user ? (
                <>
                  <StyledLogoutIcon onClick={handleLogout} />
                  <p>{user.displayName} 님</p>
                </>
              ) : (
                <StyledLoginIcon onClick={openModal} />
              )}
            </Test>
          </DateandUser>
          <LeftBottomContainer>
            <CityandTemp>
              <h2>{weatherData.main.temp}°C</h2>
              <h1>{weatherData.name}</h1>
            </CityandTemp>
          </LeftBottomContainer>
          <DownBtn>
            <FaAngleDoubleDown onClick={handleClothesButtonClick} />
          </DownBtn>
        </WeatherInfo>
        <WeatherDataContainer>
          <InputContainer>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='SEARCH CITY NAME'
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
            <div>
              <p> {displayedOutfit}</p>
            </div>
          </WeatherDetails>
        </WeatherDataContainer>
      </WeatherBackground>
    </WeatherDisplayContainer>
  );
};

export default WeatherDisplay;
