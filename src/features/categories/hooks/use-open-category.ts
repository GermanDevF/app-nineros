import { create } from "zustand";

type OpenCategoryStore = {
  isOpen: boolean;
  id?: string;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useOpenCategoryStore = create<OpenCategoryStore>((set) => ({
  isOpen: false,
  id: undefined,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
