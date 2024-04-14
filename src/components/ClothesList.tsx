import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { auth, fetchClothesData } from '../api/firebase';
import {
  ClothesItemContainer,
  ClothesListContainer,
  ClothesWrap,
  MoreButton,
  DownScrollWrap,
  UpScrollWrap,
} from './ClothesListStyles';
import useWeatherStore from '../store/WeatherStore';
import { getWeatherOutfit } from '../hooks/WeatherUtils';
import { useNavigate } from 'react-router-dom';
import ModalStore from '../store/ModalStore';
import { scroller } from 'react-scroll';
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';
import { ClothesItem } from '../types/ClothesItem';
import SignUp from './SignUp';

const ClothesList: React.FC = () => {
  const [clothesData, setClothesData] = useState<ClothesItem[]>([]);
  const [displayedItems, setDisplayedItems] = useState(8);
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

  const handleResize = () => {
    if (window.innerWidth <= 730) {
      setDisplayedItems(4);
    } else {
      setDisplayedItems(8);
    }
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
      handleResize();
    };
    fetchData();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [weatherData]);

  const openModal = () => {
    const currentuser = auth.currentUser;
    if (currentuser) {
      navigate('/clothesrecommend');
    } else {
      setModalOpen(true);
    }
  };

  return (
    <ClothesListContainer>
      <UpScrollWrap>
        <FaAngleDoubleUp onClick={backToPreviousSection} />
      </UpScrollWrap>
      <h2>옷추천 목록</h2>
      <ClothesWrap>
        {clothesData.slice(0, displayedItems).map((item) => (
          <ClothesItemContainer key={uuidv4()}>
            <img src={item.imageURL} alt={item.name} />
            <h3>{item.name}</h3>
          </ClothesItemContainer>
        ))}
      </ClothesWrap>
      <MoreButton onClick={openModal}>더 많은 옷 보기</MoreButton>
      <DownScrollWrap>
        <FaAngleDoubleDown onClick={openLeisureSection} />
      </DownScrollWrap>
      {isModalOpen && <SignUp redirectPath='/clothesList' />}
    </ClothesListContainer>
  );
};

export default ClothesList;
