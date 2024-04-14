import React, { useEffect, useState } from 'react';
import { auth, fetchLeisureData } from '../api/firebase';
import {
  LeisureItemContainer,
  LeisureListContainer,
  LeisureWrap,
  MoreButton,
  DownScrollWrap,
  UpScrollWrap,
} from './LeisureListStyles';
import { v4 as uuidv4 } from 'uuid';
import useWeatherStore from '../store/WeatherStore';
import { useNavigate } from 'react-router-dom';
import ModalStore from '../store/ModalStore';
import SignUp from './SignUp';
import { scroller } from 'react-scroll';
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';
import { LeisureItem } from '../types/LeisureItem';

export default function Leisure() {
  const [leisureData, setLeisureData] = useState<LeisureItem[]>([]);
  const [displayedItems, setDisplayedItems] = useState(8);
  const isModalOpen = ModalStore((state) => state.isModalOpen);
  const setModalOpen = ModalStore((state) => state.setIsModalOpen);
  const navigate = useNavigate();

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
        const currentMonth = new Date().getMonth() + 1;
        let leisurecategory = '';
        if (currentMonth >= 3 && currentMonth <= 5) {
          leisurecategory = 'spring';
        } else if (currentMonth >= 6 && currentMonth <= 8) {
          leisurecategory = 'summer';
        } else if (currentMonth >= 9 && currentMonth <= 10) {
          leisurecategory = 'fall';
        } else {
          leisurecategory = 'winter';
        }
        const data = await fetchLeisureData([leisurecategory]);
        setLeisureData(data);
      } catch (error) {
        console.log('데이터 가져오기 중 에러 발생:', error);
      }
      handleResize();
    };
    fetchData();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      <UpScrollWrap>
        <FaAngleDoubleUp onClick={backToPreviousSection} />
      </UpScrollWrap>
      <h2>여가활동 추천</h2>
      <LeisureWrap>
        {leisureData.slice(0, displayedItems).map((item) => (
          <LeisureItemContainer key={uuidv4()}>
            <img src={item.imageURL} alt={item.name} />
            <h3>{item.name}</h3>
          </LeisureItemContainer>
        ))}
      </LeisureWrap>
      <MoreButton onClick={openModal}>더 많은 레저 보기</MoreButton>
      <DownScrollWrap>
        <FaAngleDoubleDown onClick={openWeatherSection} />
      </DownScrollWrap>
      {isModalOpen && <SignUp redirectPath='/leisure' />}
    </LeisureListContainer>
  );
}
