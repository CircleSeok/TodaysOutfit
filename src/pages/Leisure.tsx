import React, { useEffect, useState } from 'react';
import { fetchLeisureData } from '../api/firebase';
import {
  LeisureItemContainer,
  LeisureListContainer,
  LeisureWrap,
} from './LeisureListStyles';

export interface LeisureItem {
  id: string;
  name: string;
  category: string;
  imageURL: string;
  description: string;
}

export default function Leisure() {
  const [leisureData, setLeisureData] = useState<LeisureItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLeisureData();
        setLeisureData(data);
      } catch (error) {
        console.log('데이터 가져오기 중 에러 발생:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <LeisureListContainer>
      <h2>여가활동 추천</h2>
      <LeisureWrap>
        {leisureData.map((item, index) => (
          <LeisureItemContainer key={index}>
            <img
              src={item.imageURL}
              alt={item.name}
              style={{ height: 'auto', maxWidth: '100%' }}
            />
            <h3>{item.name}</h3>
          </LeisureItemContainer>
        ))}
      </LeisureWrap>
    </LeisureListContainer>
  );
}
