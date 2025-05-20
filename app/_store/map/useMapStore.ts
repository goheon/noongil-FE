import { create } from 'zustand'

export interface IMapStore {
  isSearchOpen: boolean
  setIsSearchOpen: (isSearchOpen: boolean) => void
}

export const useMapStore = create<IMapStore>((set) => ({
  isSearchOpen: false,
  setIsSearchOpen: (isOpen: boolean) => set({ isSearchOpen: isOpen }),
}))
