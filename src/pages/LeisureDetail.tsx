import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LeisureItem } from './Leisure';
import { AllLeisureData } from '../api/firebase';

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
    <div>
      <p>{itemName}</p>
      <img src={imageURL} alt={itemName} />
      <p>{itemDescription}</p>

      {/* 랜덤으로 선택된 4개의 레저 표시 */}
      {randomLeisures.map((item, index) => (
        <div key={index}>
          <img src={item.imageURL} alt={item.name} />
          <p>{item.name}</p>
        </div>
      ))}

      {/* 댓글 인풋 */}
      {/* 댓글영역 */}
    </div>
  );
};

export default LeisureDetail;
