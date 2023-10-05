import React, { useState } from 'react';
import { fetchWeatherData } from '../api/api';
import { GiClothes } from 'react-icons/gi';
import useWeatherStore from '../store/WeatherStore';
import {
  NavbarContainer,
  NavbarLeft,
  NavbarMiddle,
  NavbarRight,
} from './NavbarStyles';

export default function Navbar() {
  const [cityName, setCityName] = useState<string>('');
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

  return (
    <NavbarContainer>
      <NavbarLeft>
        <h1>오늘 뭐 입지?</h1>
      </NavbarLeft>
      <NavbarMiddle>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='도시 이름을 입력하고 엔터'
            value={cityName}
            onChange={handleChange}
          />
        </form>
      </NavbarMiddle>
      <NavbarRight>
        <GiClothes />
      </NavbarRight>
    </NavbarContainer>
  );
}
