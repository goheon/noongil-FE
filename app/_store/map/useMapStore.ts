import { create } from 'zustand'
import { MapType } from '@/app/_utils/MapHooks'

interface MapState {
  isSearchOpen: boolean
  map: MapType | null
  setMap: (map: MapType | null) => void
  setIsSearchOpen: (isOpen: boolean) => void
}

export const useMapStore = create<MapState>((set) => ({
  isSearchOpen: false,
  map: null,
  setMap: (map) => set({ map }),
  setIsSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
}))
