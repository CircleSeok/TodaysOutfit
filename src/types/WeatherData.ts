interface WeatherData {
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  rain?: {
    '1h': number; // 비 예측량 (1시간 단위)
  };
  snow?: {
    '1h': number; // 눈 예측량 (1시간 단위)
  };
}

export default WeatherData;
