import create from 'zustand';

interface NavbarStore {
  categories: string[];
  selectedCategory: string;
  setCategories: (categories: string[]) => void;
  setSelectedCategory: (selectedCategory: string) => void;
}

export const useNavbarStore = create<NavbarStore>((set) => ({
  categories: ['전체', '아우터', '상의', '하의'],
  selectedCategory: '전체',
  setCategories: (categories) => set({ categories }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
}));
