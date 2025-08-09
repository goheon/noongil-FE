import { create } from 'zustand'
import { MapType } from '@/app/_utils/MapHooks'
import { MapEventInfo } from '@/app/_components'

interface MapState {
  isSearchOpen: boolean
  isFilterOpen: boolean
  isListSheetShowing: boolean
  isListSheetOpen: boolean
  isSelectSheetShowing: boolean
  isSelectSheetOpen: boolean
  map: MapType | null
  selectedEvent: MapEventInfo | null
  setMap: (map: MapType | null) => void
  setIsSearchOpen: (isOpen: boolean) => void
  setIsFilterOpen: (isOpen: boolean) => void
  setIsListSheetShowing: (isShwoing: boolean) => void
  setIsListSheetOpen: (isOpen: boolean) => void
  setIsSelectSheetShowing: (isShwoing: boolean) => void
  setIsSelectSheetOpen: (isOpen: boolean) => void
  setSelectedEventInfo: (eventInfo: MapEventInfo | null) => void
}

export const useMapStore = create<MapState>((set) => ({
  isSearchOpen: false,
  isFilterOpen: false,
  isListSheetShowing: false,
  isListSheetOpen: false,
  isSelectSheetShowing: false,
  isSelectSheetOpen: false,
  selectedEvent: null,
  map: null,
  setMap: (map) => set({ map }),
  setIsSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  setIsFilterOpen: (isOpen) => set({ isFilterOpen: isOpen }),
  setIsListSheetShowing: (isShwoing) => set({ isListSheetShowing: isShwoing }),
  setIsListSheetOpen: (isOpen) => set({ isListSheetOpen: isOpen }),
  setIsSelectSheetShowing: (isShwoing) =>
    set({ isSelectSheetShowing: isShwoing }),
  setIsSelectSheetOpen: (isOpen) => set({ isSelectSheetOpen: isOpen }),
  setSelectedEventInfo: (eventInfo) => set({ selectedEvent: eventInfo }),
}))
