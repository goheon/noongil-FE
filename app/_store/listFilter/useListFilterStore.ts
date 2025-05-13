import { create } from 'zustand'
import { TFilter, TOrder } from '@/app/_components/features/searchList/type'
import { TEventCategory } from '@/app/_types'

interface IListFilter {
  isOpen: boolean
  filter: TFilter | null
  order: TOrder | null
  category: TEventCategory[]
  startDate: Date | null
  endDate: Date | null
  setFilter: (filter: TFilter) => void
  setOpen: (isOpen: boolean) => void
  setOrder: (order: TOrder) => void
  setCategory: (catergory: TEventCategory) => void
  setStartDate: (date: Date | null) => void
  setEndDate: (date: Date | null) => void
  reset: () => void
}

export const useListFilterStore = create<IListFilter>((set) => ({
  isOpen: false,
  filter: null,
  order: null,
  category: [],
  startDate: null,
  endDate: null,
  setOpen: (isOpen: boolean) => set({ isOpen: isOpen }),
  setFilter: (filter: TFilter) => set({ filter: filter }),
  setOrder: (order) => set({ order: order }),
  setCategory: (category: TEventCategory) =>
    set((state) => ({
      category: state.category.includes(category)
        ? state.category.filter((c) => c !== category) // 있으면 제거
        : [...state.category, category], // 없으면 추가
    })),
  setStartDate: (date: Date | null) => set({ startDate: date }),
  setEndDate: (date: Date | null) => set({ endDate: date }),
  reset: () =>
    set({ order: null, category: [], startDate: null, endDate: null }),
}))
