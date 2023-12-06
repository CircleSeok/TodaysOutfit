import React, { useEffect, useState } from 'react';
import { auth, fetchLeisureData } from '../api/firebase';
import {
  LeisureItemContainer,
  LeisureListContainer,
  LeisureWrap,
  MoreButton,
  ScrollWrap,
} from './LeisureListStyles';
import useWeatherStore from '../store/WeatherStore';
import { getSeason } from './WeatherUtils';
import { useNavigate } from 'react-router-dom';
import ModalStore from '../store/ModalStore';
import SignUp from './SignUp';
import { scroller } from 'react-scroll';
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';
export interface LeisureItem {
  id: string;
  name: string;
  category: string;
  imageURL: string;
  description: string;
}

export default function Leisure() {
  const [leisureData, setLeisureData] = useState<LeisureItem[]>([]);
  const isModalOpen = ModalStore((state) => state.isModalOpen);
  const setModalOpen = ModalStore((state) => state.setIsModalOpen);
  const navigate = useNavigate();
  const weatherData = useWeatherStore((state) => state.weatherData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (weatherData) {
          const leisurecategory = getSeason(weatherData.main.temp);
          // console.log('리턴받는 배열', leisurecategory);
          const data = await fetchLeisureData(leisurecategory);
          // console.log(data);
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
      navigate('/leisurerecommend');
    } else {
      setModalOpen(true);
    }
  };

  const openWeatherSection = () => {
    scroller.scrollTo('weather', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  const backToPreviousSection = () => {
    scroller.scrollTo('clothes', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <LeisureListContainer>
      <ScrollWrap>
        <FaAngleDoubleUp onClick={backToPreviousSection} />
      </ScrollWrap>

      <h2>여가활동 추천</h2>
      {/* <p>{weatherData?.main.temp}</p> */}
      <LeisureWrap>
        {leisureData.slice(0, 8).map((item, index) => (
          <LeisureItemContainer key={index}>
            <img
              src={item.imageURL}
              alt={item.name}
              style={{
                height: '300px',
                width: '100%',
                objectFit: 'cover',
              }}
            />
            <h3>{item.name}</h3>
          </LeisureItemContainer>
        ))}
      </LeisureWrap>
      <MoreButton onClick={openModal}>더 많은 레저 보기</MoreButton>
      {/* <button onClick={openWeatherSection}>weather로</button>
      <button onClick={backToPreviousSection}>이전 화면으로</button> */}
      <ScrollWrap>
        <FaAngleDoubleDown onClick={openWeatherSection} />
      </ScrollWrap>

      {isModalOpen && <SignUp redirectPath='/leisure' />}
    </LeisureListContainer>
  );
}
