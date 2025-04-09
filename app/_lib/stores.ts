import { create } from 'zustand'

const usePopupStore = create((set) => ({}))

const useExhibitionStore = create((set) => ({}))

const useMapStore = create((set) => ({}))

const useAdminStore = create((set) => ({}))

type LoginStore = {
  loadEnd: boolean
  setLoadEnd: () => void
}

const useLoginStore = create<LoginStore>((set) => ({
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
