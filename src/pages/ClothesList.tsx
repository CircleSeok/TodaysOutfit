import React, { useState, useEffect } from 'react';
import { auth, fetchClothesData } from '../api/firebase';
import {
  ClothesItemContainer,
  ClothesListContainer,
  ClothesWrap,
  MoreButton,
} from './ClothesListStyles';
import useWeatherStore from '../store/WeatherStore';
import { getWeatherOutfit } from '../components/WeatherUtils';
import { useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
export interface ClothesItem {
  id: string;
  name: string;
  category: string;
  imageURL: string;
  description: string;
}

const ClothesList: React.FC = () => {
  const [clothesData, setClothesData] = useState<ClothesItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const weatherData = useWeatherStore((state) => state.weatherData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (weatherData) {
          const weatherCategory = getWeatherOutfit(weatherData.main.temp);
          const data = await fetchClothesData(weatherCategory);
          setClothesData(data);
        }
      } catch (error) {
        console.error('데이터 가져오기 중 에러 발생:', error);
      }
    };
    console.log(weatherData);
    console.log(clothesData);
    fetchData();
  }, [weatherData]);

  const openModal = () => {
    const currentuser = auth.currentUser;
    if (currentuser) {
      navigate('/clothesDetail');
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <ClothesListContainer>
      <h2>옷 목록</h2>
      <p>{weatherData?.main.temp}</p>
      <ClothesWrap>
        {clothesData.slice(0, 8).map((item, index) => (
          <ClothesItemContainer key={index}>
            <img
              src={item.imageURL}
              alt={item.name}
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
            <h3>{item.name}</h3>
          </ClothesItemContainer>
        ))}
      </ClothesWrap>
      <MoreButton onClick={openModal}>더 많은 옷 보기</MoreButton>
      <button>로그아웃</button>
      {isModalOpen && <SignUp />}
    </ClothesListContainer>
  );
};

export default ClothesList;
