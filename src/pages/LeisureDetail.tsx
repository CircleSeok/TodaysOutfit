import React, { useState, useEffect } from 'react';
import { fetchLeisureData } from '../api/firebase';

interface LeisureItem {
  id: string;
  name: string;
  category: string;
  imageURL: string;
  description: string;
}

const LeisureDetail: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [leisureData, setLeisureData] = useState<LeisureItem[]>([]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data: LeisureItem[] = [];

        if (selectedCategory === '전체') {
          const allData = await fetchLeisureData([
            'spring',
            'summer',
            'fall',
            'winter',
          ]);
          data = allData.flat();
        } else {
          const translatedCategory = translateCategory(selectedCategory);
          data = await fetchLeisureData([translatedCategory]);
        }

        setLeisureData(data);
      } catch (error) {
        console.error('데이터 가져오기 중 에러 발생:', error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const translateCategory = (category: string): string => {
    switch (category) {
      case '봄':
        return 'spring';
      case '여름':
        return 'summer';
      case '가을':
        return 'fall';
      case '겨울':
        return 'winter';
      default:
        return category;
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => handleCategoryClick('전체')}>전체</button>
        <button onClick={() => handleCategoryClick('봄')}>봄</button>
        <button onClick={() => handleCategoryClick('여름')}>여름</button>
        <button onClick={() => handleCategoryClick('가을')}>가을</button>
        <button onClick={() => handleCategoryClick('겨울')}>겨울</button>
      </div>
      <div>
        {leisureData.map((item, index) => (
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

export default LeisureDetail;
