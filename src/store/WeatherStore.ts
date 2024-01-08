import create, { SetState } from 'zustand';
import WeatherData from '../types/WeatherData';
import { User } from 'firebase/auth';

interface WeatherStoreState {
  weatherData: WeatherData | null;
  user: User | null;
  setWeatherData: (data: WeatherData | null) => void;
  setUser: (user: User | null) => void;
}

const useWeatherStore = create<WeatherStoreState>((set) => ({
  weatherData: null,
  user: null,
  setWeatherData: (data) => set({ weatherData: data }),
  setUser: (user) => set({ user }),
}));

export default useWeatherStore;
