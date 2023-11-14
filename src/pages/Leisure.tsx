import React, { useEffect, useState } from 'react';
import { auth, fetchLeisureData } from '../api/firebase';
import {
  LeisureItemContainer,
  LeisureListContainer,
  LeisureWrap,
  MoreButton,
} from './LeisureListStyles';
import useWeatherStore from '../store/WeatherStore';
import { getSeason } from '../components/WeatherUtils';
import { useNavigate } from 'react-router-dom';

export interface LeisureItem {
  id: string;
  name: string;
  category: string;
  imageURL: string;
  description: string;
}

export default function Leisure() {
  const [leisureData, setLeisureData] = useState<LeisureItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const weatherData = useWeatherStore((state) => state.weatherData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (weatherData) {
          const leisurecategory = getSeason(weatherData.main.temp);
          console.log('리턴받는 배열', leisurecategory);
          const data = await fetchLeisureData(leisurecategory);
          console.log(data);
          setLeisureData(data);
        }
      } catch (error) {
        console.log('데이터 가져오기 중 에러 발생:', error);
      }
    };
    fetchData();
  }, [weatherData]);

  const openModal = () => {
    const currentuser = auth.currentUser;
    if (currentuser) {
      navigate('/liesureDetail');
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <LeisureListContainer>
      <h2>여가활동 추천</h2>
      <p>{weatherData?.main.temp}</p>
      <LeisureWrap>
        {leisureData.slice(0, 8).map((item, index) => (
          <LeisureItemContainer key={index}>
            <img
              src={item.imageURL}
              alt={item.name}
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
              }}
            />
            <h3>{item.name}</h3>
          </LeisureItemContainer>
        ))}
      </LeisureWrap>
      <MoreButton onClick={openModal}>더 많은 레저 보기</MoreButton>
    </LeisureListContainer>
  );
}
