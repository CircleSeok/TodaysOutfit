interface WeatherData {
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
    pressure: number;
  };
  wind?: {
    speed: number; // 풍속 (m/s)
    deg: number; // 풍향 (도)
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
