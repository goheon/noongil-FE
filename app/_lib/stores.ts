import { create } from 'zustand'

const usePopupStore = create((set) => ({}))

const useExhibitionStore = create((set) => ({}))

const useMapStore = create((set) => ({}))

const useAdminStore = create((set) => ({}))

const useLoginStore = create((set) => ({
  loadEnd: false,

  setLoadEnd: () => set({ loadEnd: true }),
}))

export {
  usePopupStore,
  useExhibitionStore,
  useMapStore,
  useAdminStore,
  useLoginStore,
}
