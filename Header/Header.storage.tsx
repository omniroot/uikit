import { ReactNode } from "@tanstack/react-router";
import { create } from "zustand";

interface IHeader {
  title: string | null;
  icon: ReactNode | null;
  setTitle: (title: string | null) => void;
  setIcon: (icon: ReactNode | null) => void;
}

export const useHeader = create<IHeader>((set) => ({
  title: null,
  icon: null,
  setTitle: (title) => set({ title }),
  setIcon: (icon) => set({ icon }),
}));
