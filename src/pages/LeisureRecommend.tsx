import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { fetchLeisureData } from '../api/firebase';
import { translateCategory } from '../hooks/WeatherUtils';
import { Link } from 'react-router-dom';
import {
  ButtonsContainer,
  Container,
  ItemContainer,
  ItemWrapper,
} from './RecommendStyles';
import { LeisureItem } from '../types/LeisureItem';

const LeisureRecommend: React.FC = () => {
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
    window.scrollTo(0, 0);
    window.addEventListener('scroll', handleScroll);

    setLeisureData([]);
    setHasMore(true);
    fetchMoreData();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, selectedCategory]);

  return (
    <Container>
      <h1>여러가지 레저를 추천해드려요</h1>
      <ButtonsContainer>
        <button
          onClick={() => handleCategoryClick('전체')}
          className={selectedCategory === '전체' ? 'active' : ''}
        >
          전체
        </button>
        <button
          onClick={() => handleCategoryClick('봄')}
          className={selectedCategory === '봄' ? 'active' : ''}
        >
          봄
        </button>
        <button
          onClick={() => handleCategoryClick('여름')}
          className={selectedCategory === '여름' ? 'active' : ''}
        >
          여름
        </button>
        <button
          onClick={() => handleCategoryClick('가을')}
          className={selectedCategory === '가을' ? 'active' : ''}
        >
          가을
        </button>
        <button
          onClick={() => handleCategoryClick('겨울')}
          className={selectedCategory === '겨울' ? 'active' : ''}
        >
          겨울
        </button>
      </ButtonsContainer>
      <h3>원하는 레저 찾아보세요</h3>
      <ItemContainer>
        {leisureData.map((item) => (
          <ItemWrapper key={uuidv4()}>
            <Link
              to={`/leisurerecommend/${encodeURIComponent(item.name)}`}
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

export default LeisureRecommend;
