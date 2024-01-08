import create from 'zustand';

interface UserStoreState {
  nickname: string | null;
  setNickname: (name: string | null) => void;
}

const UserStore = create<UserStoreState>((set) => ({
  nickname: null,
  setNickname: (name) => set({ nickname: name }),
}));

export default UserStore;
