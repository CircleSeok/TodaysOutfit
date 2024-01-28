import create from 'zustand';

interface NavStore {
  currentTab: string;
  setTab: (tab: string) => void;
}

const useNavTabStore = create<NavStore>((set) => ({
  currentTab: '',
  setTab: (tab) => set({ currentTab: tab }),
}));

export default useNavTabStore;
