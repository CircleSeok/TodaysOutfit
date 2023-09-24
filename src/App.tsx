// App.tsx
import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from './api/api';
import WeatherInfo from './components/WeatherInfo';
import Map from './components/Map';

function App() {
  const [weatherData, setWeatherData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeatherData();
      setWeatherData(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <WeatherInfo weatherData={weatherData} />
      <Map />
    </>
  );
}

export default App;
