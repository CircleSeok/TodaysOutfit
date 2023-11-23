import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LeisureItem } from './Leisure';
import { AllLeisureData } from '../api/firebase';
import styled from 'styled-components';
const Container = styled.div`
  width: 1080px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid red;
`;
const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const ClothesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  img {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const LeisureDetail: React.FC = () => {
  const location: any = useLocation();

  const { itemName, imageURL, itemDescription } = location.state;
  const [randomLeisures, setRandomLeisures] = useState<LeisureItem[]>([]);

  useEffect(() => {
    const fetchRandomLeisures = async () => {
      try {
        const leisureData = await AllLeisureData();

        const randomIndexes = getRandomIndexes(leisureData.length, 4);
        const selectedLeisure = randomIndexes.map(
          (index) => leisureData[index]
        );

        setRandomLeisures(selectedLeisure);
      } catch (error) {
        console.log('패치 에러', error);
      }
    };
    fetchRandomLeisures();
  }, []);

  const getRandomIndexes = (max: number, count: number): number[] => {
    const indexes: number[] = [];
    while (indexes.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  };

  return (
    <Container>
      <p>{itemName}</p>
      <MainImage src={imageURL} alt={itemName} />
      <p>{itemDescription}</p>

      {/* 랜덤으로 선택된 4개의 레저 표시 */}
      <p>추천 레저</p>
      <ClothesContainer>
        {randomLeisures.map((item, index) => (
          <div key={index}>
            <img src={item.imageURL} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </ClothesContainer>
      {/* 댓글 인풋 */}
      {/* 댓글영역 */}
    </Container>
  );
};

export default LeisureDetail;
