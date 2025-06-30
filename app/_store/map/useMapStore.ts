import { create } from 'zustand'
import { MapType } from '@/app/_utils/MapHooks'

interface MapState {
  isSearchOpen: boolean
  isFilterOpen: boolean
  isListSheetShowing: boolean
  isSelectSheetShowing: boolean
  map: MapType | null
  setMap: (map: MapType | null) => void
  setIsSearchOpen: (isOpen: boolean) => void
  setIsFilterOpen: (isOpen: boolean) => void
  setIsListSheetShowing: (isOpen: boolean) => void
  setIsSelectSheetShowing: (isOpen: boolean) => void
}

export const useMapStore = create<MapState>((set) => ({
  isSearchOpen: false,
  isFilterOpen: false,
  isListSheetShowing: false,
  isSelectSheetShowing: false,
  map: null,
  setMap: (map) => set({ map }),
  setIsSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  setIsFilterOpen: (isOpen) => set({ isFilterOpen: isOpen }),
  setIsListSheetShowing: (isOpen) => set({ isListSheetShowing: isOpen }),
  setIsSelectSheetShowing: (isOpen) => set({ isSelectSheetShowing: isOpen }),
}))
