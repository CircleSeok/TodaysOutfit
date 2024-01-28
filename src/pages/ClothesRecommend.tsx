// ClothesRecommend.tsx
import React, { useState, useEffect } from 'react';
import { fetchClothesData } from '../api/firebase';
import { getOutfitByCategory } from '../components/WeatherUtils';
import { Link, useLocation } from 'react-router-dom';
import {
  ButtonsContainer,
  Container,
  ItemContainer,
  ItemWrapper,
} from './ClothesRecommendStyles';
import Navbar from '../components/Navbar';

export interface ClothesItem {
  id: string;
  name: string;
  category: string;
  imageURL: string;
  description: string;
}

const ClothesRecommend: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [clothesData, setClothesData] = useState<ClothesItem[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const handleCategoryClick = (category: string) => {
    // console.log('Clicked category:', category);
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
    window.scrollTo(0, 0);
    // console.log('Selected category:', selectedCategory);
    window.addEventListener('scroll', handleScroll);

    setClothesData([]);
    setHasMore(true);
    fetchMoreData();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, selectedCategory]);

  return (
    <Container>
      <h1>여러가지 옷을 추천해드려요</h1>
      <ButtonsContainer>
        <button
          onClick={() => handleCategoryClick('전체')}
          className={selectedCategory === '전체' ? 'active' : ''}
        >
          전체
        </button>
        <button
          onClick={() => handleCategoryClick('아우터')}
          className={selectedCategory === '아우터' ? 'active' : ''}
        >
          아우터
        </button>
        <button
          onClick={() => handleCategoryClick('상의')}
          className={selectedCategory === '상의' ? 'active' : ''}
        >
          상의
        </button>
        <button
          onClick={() => handleCategoryClick('하의')}
          className={selectedCategory === '하의' ? 'active' : ''}
        >
          하의
        </button>
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
