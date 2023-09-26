// WeatherData.ts
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
}

export default WeatherData;
