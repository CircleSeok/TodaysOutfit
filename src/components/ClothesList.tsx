import React, { useState, useEffect } from 'react';
import { auth, fetchClothesData, signOutUser } from '../api/firebase';
import {
  ClothesItemContainer,
  ClothesListContainer,
  ClothesWrap,
  MoreButton,
  ScrollWrap,
} from './ClothesListStyles';
import useWeatherStore from '../store/WeatherStore';
import { getWeatherOutfit } from './WeatherUtils';
import { useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import ModalStore from '../store/ModalStore';
import { Link, scroller } from 'react-scroll';
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';
export interface ClothesItem {
  id: string;
  name: string;
  category: string;
  imageURL: string;
  description: string;
}

const ClothesList: React.FC = () => {
  const [clothesData, setClothesData] = useState<ClothesItem[]>([]);
  const isModalOpen = ModalStore((state) => state.isModalOpen);
  const setModalOpen = ModalStore((state) => state.setIsModalOpen);
  const navigate = useNavigate();

  const weatherData = useWeatherStore((state) => state.weatherData);

  const openLeisureSection = () => {
    scroller.scrollTo('leisure', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  const backToPreviousSection = () => {
    scroller.scrollTo('weather', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

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
    // console.log(weatherData);
    // console.log(clothesData);
    fetchData();
  }, [weatherData]);

  const openModal = () => {
    const currentuser = auth.currentUser;
    if (currentuser) {
      navigate('/clothesrecommend');
    } else {
      setModalOpen(true);
    }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ClothesListContainer>
      <ScrollWrap>
        <FaAngleDoubleUp onClick={backToPreviousSection} />
      </ScrollWrap>

      <h2>옷추천 목록</h2>
      {/* <p>{weatherData?.main.temp}</p> */}
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
      {/* <button onClick={handleLogout}>로그아웃</button> */}
      <MoreButton onClick={openModal}>더 많은 옷 보기</MoreButton>
      <ScrollWrap>
        <FaAngleDoubleDown onClick={openLeisureSection} />
      </ScrollWrap>

      {isModalOpen && <SignUp redirectPath='/clothesList' />}
    </ClothesListContainer>
  );
};

export default ClothesList;
