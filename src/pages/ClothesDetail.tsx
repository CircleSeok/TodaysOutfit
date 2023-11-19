import React, { useState, useEffect } from 'react';
import { fetchClothesData } from '../api/firebase';
import { getOutfitByCategory } from '../components/WeatherUtils';

interface ClothesItem {
  id: string;
  name: string;
  category: string;
  imageURL: string;
  description: string;
}

const ClothesDetail: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [clothesData, setClothesData] = useState<ClothesItem[]>([]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = getOutfitByCategory(selectedCategory);
        console.log('Selected Category:', category);
        const data = await fetchClothesData(category);
        console.log('Fetched Data:', data);
        setClothesData(data);
      } catch (error) {
        console.error('데이터 가져오기 중 에러 발생:', error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
    console.log('Updated Clothes Data:', clothesData);
  }, [clothesData]);

  return (
    <div>
      <div>
        <button onClick={() => handleCategoryClick('전체')}>전체</button>
        <button onClick={() => handleCategoryClick('아우터')}>아우터</button>
        <button onClick={() => handleCategoryClick('상의')}>상의</button>
        <button onClick={() => handleCategoryClick('하의')}>하의</button>
      </div>
      <div>
        {clothesData.map((item, index) => (
          <div key={index}>
            <img
              src={item.imageURL}
              alt={item.name}
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClothesDetail;
