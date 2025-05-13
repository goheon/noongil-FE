import { create } from 'zustand'

export interface IMapStore {
  isSearchOpen: boolean
  categoryStatus: string
  setIsSearchOpen: (isSearchOpen: boolean) => void
  setCategoryStatus: (category: string) => void
}

export const useMapStore = create<IMapStore>((set) => ({
  isSearchOpen: false,
  categoryStatus: 'all',

  setIsSearchOpen: (isOpen: boolean) => set({ isSearchOpen: isOpen }),
  setCategoryStatus: (category: string) => set({ categoryStatus: category }),
}))
