import { create } from 'zustand'

import { DisplayState } from '../_types'

const useDisplayState = create<DisplayState>((set) => ({
  location: 'index',
  headerState: 'normal',
  isNavigationDisplay: true,

  setLocation: (value: string) => set({ location: value }),
  setHeaderState: (value: 'normal' | 'searching' | 'searched') =>
    set({ headerState: value }),
  setIsNavigationDisplay: (value: boolean) =>
    set({ isNavigationDisplay: value }),
}))

const usePopupStore = create((set) => ({}))

const useExhibitionStore = create((set) => ({}))

const useMapStore = create((set) => ({}))

const useAdminStore = create((set) => ({}))

export {
  useDisplayState,
  usePopupStore,
  useExhibitionStore,
  useMapStore,
  useAdminStore,
}
