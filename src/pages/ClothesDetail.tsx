import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AllClothesData } from '../api/firebase';
import { ClothesItem } from './ClothesList';
interface ClothesDetailProps {
  itemName: string;
  imageURL: string;
  itemDescription: string;
}

const ClothesDetail: React.FC = () => {
  const location: any = useLocation();
  const { itemName, imageURL, itemDescription } =
    location.state as ClothesDetailProps;
  const [randomClothes, setRandomClothes] = useState<ClothesItem[]>([]);

  useEffect(() => {
    const fetchRandomClothes = async () => {
      try {
        const clothesData = await AllClothesData();

        const randomIndexes = getRandomIndexes(clothesData.length, 4);
        const selectedClothes = randomIndexes.map(
          (index) => clothesData[index]
        );

        setRandomClothes(selectedClothes);
      } catch (error) {
        console.error(' 패치 에러', error);
      }
    };

    fetchRandomClothes();
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

      {/* 랜덤으로 선택된 4개의 옷 표시 */}
      {randomClothes.map((item, index) => (
        <div key={index}>
          <img src={item.imageURL} alt={item.name} />
          <p>{item.name}</p>
        </div>
      ))}

      {/* 댓글 인풋 */}
      {/* 댓글 영역 */}
    </div>
  );
};

export default ClothesDetail;
