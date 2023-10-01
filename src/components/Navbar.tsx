import React, { useState } from 'react';
import { fetchWeatherData } from '../api/api';
import { GiClothes } from 'react-icons/gi';
import useWeatherStore from '../store/WeatherStore';

export default function Navbar() {
  const [cityName, setCityName] = useState<string>('서울');
  const setWeatherData = useWeatherStore((state) => state.setWeatherData);

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

  return (
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
  );
}
