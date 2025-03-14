import { create } from 'zustand'
import {
  Filter,
  Order,
  Category,
} from '@/app/_components/features/searchList/type'

interface IListFilter {
  isOpen: boolean
  filter: Filter | null
  order: Order | null
  category: Category[]
  date: string
  setFilter: (filter: Filter) => void
  setOpen: (isOpen: boolean) => void
  setOrder: (order: Order) => void
  setCategory: (catergory: Category) => void
  setDate: (date: string) => void
  reset: () => void
}

export const useListFilterStore = create<IListFilter>((set) => ({
  isOpen: false,
  filter: null,
  order: null,
  category: [],
  date: '',
  setOpen: (isOpen: boolean) => set({ isOpen: isOpen }),
  setFilter: (filter: Filter) => set({ filter: filter }),
  setOrder: (order) => set({ order: order }),
  setCategory: (category: Category) =>
    set((state) => ({
      category: state.category.includes(category)
        ? state.category.filter((c) => c !== category) // 있으면 제거
        : [...state.category, category], // 없으면 추가
    })),
  setDate: (date: string) => set({ date: date }),
  reset: () => set({ order: null, category: [], date: '' }),
}))
