// WeatherInfo.tsx
import React from 'react';

type WeatherItem = {
  category: string;
  value: string;
};

type WeatherInfoProps = {
  weatherData: WeatherItem[];
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weatherData }) => {
  return (
    <div>
      <h1>오늘 서울의 날씨</h1>
      {weatherData.length > 0 ? (
        <div>
          <ul>
            {weatherData.map((item: WeatherItem, index: number) => (
              <li key={index}>
                {item.category}: {item.value}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>데이터 로딩 중...</p>
      )}
    </div>
  );
};

export default WeatherInfo;
