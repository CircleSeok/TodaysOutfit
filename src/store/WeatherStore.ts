import create, { SetState } from 'zustand';
import WeatherData from '../types/WeatherData';

interface WeatherStoreState {
  weatherData: WeatherData | null;
  setWeatherData: (data: WeatherData | null) => void;
}

const useWeatherStore = create<WeatherStoreState>(
  (set: SetState<WeatherStoreState>) => ({
    weatherData: null,
    setWeatherData: (data: WeatherData | null) => set({ weatherData: data }),
  })
);

export default useWeatherStore;
