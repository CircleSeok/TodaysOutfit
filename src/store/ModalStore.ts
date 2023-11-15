import create from 'zustand';

interface ModalStoreState {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const ModalStore = create<ModalStoreState>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
}));

export default ModalStore;
