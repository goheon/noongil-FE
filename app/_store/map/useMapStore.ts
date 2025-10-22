import { MapEventInfo } from '@/app/_components'
import { MapType } from '@/app/_store/map/MapHooks'
import { create } from 'zustand'

interface MapState {
  isSearchOpen: boolean
  isFilterOpen: boolean
  isListSheetShowing: boolean
  isListSheetOpen: boolean
  isSelectSheetShowing: boolean
  isSelectSheetOpen: boolean
  zoomCount: number
  currentZoom: number
  map: MapType | null
  selectedEvent: MapEventInfo | null
  labelRenderCenter: { lat: number; lng: number } | null
  isProgrammaticMove: boolean
  isInitialDataLoaded: boolean
  setMap: (map: MapType | null) => void
  setIsSearchOpen: (isOpen: boolean) => void
  setIsFilterOpen: (isOpen: boolean) => void
  setIsListSheetShowing: (isShwoing: boolean) => void
  setIsListSheetOpen: (isOpen: boolean) => void
  setIsSelectSheetShowing: (isShwoing: boolean) => void
  setIsSelectSheetOpen: (isOpen: boolean) => void
  setZoomCount: (count: number) => void
  setCurrentZoom: (zoom: number) => void
  setSelectedEventInfo: (eventInfo: MapEventInfo | null) => void
  setLabelRenderCenter: (center: { lat: number; lng: number } | null) => void
  setIsProgrammaticMove: (isProgrammatic: boolean) => void
  setIsInitialDataLoaded: (isLoaded: boolean) => void
}

export const useMapStore = create<MapState>((set) => ({
  isSearchOpen: false,
  isFilterOpen: false,
  isListSheetShowing: false,
  isListSheetOpen: false,
  isSelectSheetShowing: false,
  isSelectSheetOpen: false,
  zoomCount: 0,
  currentZoom: 15,
  selectedEvent: null,
  map: null,
  labelRenderCenter: null,
  isProgrammaticMove: false,
  isInitialDataLoaded: false,
  setMap: (map) => set({ map }),
  setIsSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  setIsFilterOpen: (isOpen) => set({ isFilterOpen: isOpen }),
  setIsListSheetShowing: (isShwoing) => set({ isListSheetShowing: isShwoing }),
  setIsListSheetOpen: (isOpen) => set({ isListSheetOpen: isOpen }),
  setIsSelectSheetShowing: (isShwoing) =>
    set({ isSelectSheetShowing: isShwoing }),
  setIsSelectSheetOpen: (isOpen) => set({ isSelectSheetOpen: isOpen }),
  setZoomCount: (count) => set({ zoomCount: count }),
  setCurrentZoom: (zoom) => set({ currentZoom: zoom }),
  setSelectedEventInfo: (eventInfo) => set({ selectedEvent: eventInfo }),
  setLabelRenderCenter: (center) => set({ labelRenderCenter: center }),
  setIsProgrammaticMove: (isProgrammatic) =>
    set({ isProgrammaticMove: isProgrammatic }),
  setIsInitialDataLoaded: (isLoaded) => set({ isInitialDataLoaded: isLoaded }),
}))
