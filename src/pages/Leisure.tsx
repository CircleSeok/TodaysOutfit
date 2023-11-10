import React, { useEffect, useState } from 'react';
import { fetchLeisureData } from '../api/firebase';
import {
  LeisureItemContainer,
  LeisureListContainer,
  LeisureWrap,
} from './LeisureListStyles';
import useWeatherStore from '../store/WeatherStore';
import { getSeason } from '../components/WeatherUtils';

export interface LeisureItem {
  id: string;
  name: string;
  category: string;
  imageURL: string;
  description: string;
}

export default function Leisure() {
  const [leisureData, setLeisureData] = useState<LeisureItem[]>([]);

  const weatherData = useWeatherStore((state) => state.weatherData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (weatherData) {
          const leisurecategory = getSeason(weatherData.main.temp);
          const data = await fetchLeisureData(leisurecategory);
          setLeisureData(data);
        }
      } catch (error) {
        console.log('데이터 가져오기 중 에러 발생:', error);
      }
    };
    fetchData();
  }, [weatherData]);

  return (
    <LeisureListContainer>
      <h2>여가활동 추천</h2>
      <LeisureWrap>
        {leisureData.map((item, index) => (
          <LeisureItemContainer key={index}>
            <img
              src={item.imageURL}
              alt={item.name}
              style={{ height: 'auto', maxWidth: '100%' }}
            />
            <h3>{item.name}</h3>
          </LeisureItemContainer>
        ))}
      </LeisureWrap>
    </LeisureListContainer>
  );
}
