import { create } from 'zustand'

const usePopupStore = create((set) => ({}))

const useExhibitionStore = create((set) => ({}))

const useMapStore = create((set) => ({}))

const useAdminStore = create((set) => ({}))

type LoginStore = {
  loadEnd: boolean
  setLoadEnd: (value: boolean) => void
}

const useLoginStore = create<LoginStore>((set) => ({
  loadEnd: false,

  setLoadEnd: (value) => set({ loadEnd: value }),
}))

export {
  usePopupStore,
  useExhibitionStore,
  useMapStore,
  useAdminStore,
  useLoginStore,
}
