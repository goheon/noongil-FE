import { create } from 'zustand'

const usePopupStore = create((set) => ({}))

const useExhibitionStore = create((set) => ({}))

type MapStore = {
  category: string
  setCategory: (value: string) => void
}
const useMapStore = create<MapStore>((set) => ({
  category: 'all',
  setCategory: (value) => set({ category: value }),
}))

type LoginStore = {
  loadEnd: boolean
  setLoadEnd: (value: boolean) => void
}
const useLoginStore = create<LoginStore>((set) => ({
  loadEnd: false,

  setLoadEnd: (value) => set({ loadEnd: value }),
}))

type RegisterStore = {
  selectedFavPU: string[]
  selectedFavEHB: string[]
  setSelectedFavPU: (value: string[]) => void
  setSelectedFavEHB: (value: string[]) => void
  resetAll: () => void
}
const useRegisterStore = create<RegisterStore>((set) => ({
  selectedFavPU: [],
  selectedFavEHB: [],

  setSelectedFavPU: (value) => set({ selectedFavPU: value }),
  setSelectedFavEHB: (value) => set({ selectedFavEHB: value }),
  resetAll: () => set({ selectedFavPU: [], selectedFavEHB: [] }),
}))

export {
  usePopupStore,
  useExhibitionStore,
  useMapStore,
  useLoginStore,
  useRegisterStore,
}
