import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchLeisureData } from '../api/firebase';
import { translateCategory } from '../components/WeatherUtils';

interface LeisureItem {
  id: string;
  name: string;
  category: string;
  imageURL: string;
  description: string;
}

const Container = styled.div`
  width: 1080px;
  /* height: 100vh; */
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid red;
  margin: 0 auto;
`;

const ButtonsContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 30px;
  justify-content: flex-start;
  width: 100%;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ItemWrapper = styled.div`
  width: calc(25% - 10px);
  margin-bottom: 20px;
  img {
    height: 278px;
    width: 278px;
    object-fit: cover;
  }
`;

const LeisureDetail: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [leisureData, setLeisureData] = useState<LeisureItem[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const fetchMoreData = async () => {
    try {
      let newData: LeisureItem[] = [];

      if (selectedCategory === '전체') {
        const allData = await fetchLeisureData([
          'spring',
          'summer',
          'fall',
          'winter',
        ]);
        newData = allData.flat();
      } else {
        const translatedCategory = translateCategory(selectedCategory);
        newData = await fetchLeisureData([translatedCategory]);
      }

      setLeisureData((prevData) => [...prevData, ...newData]);

      if (newData.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('데이터 가져오기 중 에러 발생:', error);
    }
  };

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    if (scrollTop + clientHeight >= scrollHeight - 200 && hasMore) {
      fetchMoreData();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, selectedCategory]);

  useEffect(() => {
    setLeisureData([]);
    setHasMore(true);
    fetchMoreData();
  }, [selectedCategory]);

  return (
    <Container>
      <ButtonsContainer>
        <button onClick={() => handleCategoryClick('전체')}>전체</button>
        <button onClick={() => handleCategoryClick('봄')}>봄</button>
        <button onClick={() => handleCategoryClick('여름')}>여름</button>
        <button onClick={() => handleCategoryClick('가을')}>가을</button>
        <button onClick={() => handleCategoryClick('겨울')}>겨울</button>
      </ButtonsContainer>
      <ItemContainer>
        {leisureData.map((item, index) => (
          <ItemWrapper key={index}>
            <img src={item.imageURL} alt={item.name} />
            <h3>{item.name}</h3>
          </ItemWrapper>
        ))}
      </ItemContainer>
    </Container>
  );
};

export default LeisureDetail;
