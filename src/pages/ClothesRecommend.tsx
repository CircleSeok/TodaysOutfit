import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchClothesData } from '../api/firebase';
import { getOutfitByCategory } from '../components/WeatherUtils';
import { Link } from 'react-router-dom';

export interface ClothesItem {
  id: string;
  name: string;
  category: string;
  imageURL: string;
  description: string;
}

const Container = styled.div`
  width: 1080px;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  align-items: flex-start;
  @media (max-width: 720px) {
    width: 720px;
    h3 {
      font-size: 30px;
    }
  }
`;

const ButtonsContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 30px;
  justify-content: flex-start;
  width: 100%;
  button {
    background-color: #18a0fb;
    font-size: 20px;
    color: white;
    width: 100px;
    height: 50px;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: translateY(-5px) scale(1);

      /* filter: brightness(1.2); */
    }
  }
  @media (max-width: 720px) {
    button {
      width: 300px;
      height: 50px;
      font-size: 30px;
    }
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ItemWrapper = styled.div`
  width: calc(25% - 10px);
  margin-bottom: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px) scale(1);
  }
  img {
    height: 250px;
    width: 250px;
    object-fit: cover;
    border: 1px solid black;
    border-radius: 20px;
  }
  @media (max-width: 720px) {
    width: calc(50% - 10px);
    margin-bottom: 30px;
    /* padding: 40px; */
    p {
      margin-top: 5px;
    }
    img {
      height: 300px;
      width: 90%;
    }
    font-size: 25px;
  }
`;

const ClothesRecommend: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [clothesData, setClothesData] = useState<ClothesItem[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const fetchMoreData = async () => {
    try {
      const category = getOutfitByCategory(selectedCategory);
      const newData = await fetchClothesData(category);

      setClothesData((prevData) => [...prevData, ...newData]);

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
    setClothesData([]);
    setHasMore(true);
    fetchMoreData();
  }, [selectedCategory]);

  useEffect(() => {
    console.log('Updated Clothes Data:', clothesData);
  }, [clothesData]);

  return (
    <Container>
      <h1>여러가지 옷을 추천해드려요</h1>
      <ButtonsContainer>
        <button onClick={() => handleCategoryClick('전체')}>전체</button>
        <button onClick={() => handleCategoryClick('아우터')}>아우터</button>
        <button onClick={() => handleCategoryClick('상의')}>상의</button>
        <button onClick={() => handleCategoryClick('하의')}>하의</button>
      </ButtonsContainer>
      <h3>원하는 옷을 찾아보세요</h3>
      <ItemContainer>
        {clothesData.map((item, index) => (
          <ItemWrapper key={index}>
            <Link
              to={`/clothesrecommend/${encodeURIComponent(item.name)}`}
              state={{
                itemName: item.name,
                imageURL: item.imageURL,
                itemDescription: item.description,
              }}
            >
              <img src={item.imageURL} alt={item.name} />
            </Link>

            <p>{item.name}</p>
          </ItemWrapper>
        ))}
      </ItemContainer>
    </Container>
  );
};

export default ClothesRecommend;
