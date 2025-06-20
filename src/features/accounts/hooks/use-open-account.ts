import { create } from "zustand";

type OpenAccountStore = {
  isOpen: boolean;
  id?: string;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useOpenAccountStore = create<OpenAccountStore>((set) => ({
  isOpen: false,
  id: undefined,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
