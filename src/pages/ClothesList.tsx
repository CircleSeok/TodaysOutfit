import React, { useState, useEffect } from 'react';
import { fetchClothesData } from '../api/firebase';
import {
  ClothesItemContainer,
  ClothesListContainer,
  ClothesWrap,
} from './ClothesListStyles';

export interface ClothesItem {
  id: string;
  name: string;
  category: string;
  imageURL: string;
  description: string;
}

const ClothesList: React.FC = () => {
  const [clothesData, setClothesData] = useState<ClothesItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchClothesData();
        setClothesData(data);
      } catch (error) {
        console.error('데이터 가져오기 중 에러 발생:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ClothesListContainer>
      <h2>옷 목록</h2>
      <ClothesWrap>
        {clothesData.map((item, index) => (
          <ClothesItemContainer key={index}>
            <img
              src={item.imageURL}
              alt={item.name}
              style={{ height: 'auto', maxWidth: '100%' }}
            />
            <h3>{item.name}</h3>
          </ClothesItemContainer>
        ))}
      </ClothesWrap>
    </ClothesListContainer>
  );
};

export default ClothesList;
