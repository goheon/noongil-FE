import { create } from 'zustand'
import { TFilter, TOrder } from '@/app/_components/features/searchList/type'
import { TEventCategory } from '@/app/_types'
import {
  GeoFilterType,
  IGeoData,
} from '@/app/_components/features/searchList/type'

interface IListFilter {
  isOpen: boolean
  filter: TFilter | null
  order: TOrder | null
  category: TEventCategory[]
  startDate: Date | null
  endDate: Date | null
  regionFilter: GeoFilterType | null
  regions: IGeoData[]
  isSeoulChecked: boolean
  isGyeonggiChecked: boolean
  keyword: string
  setFilter: (filter: TFilter) => void
  setOpen: (isOpen: boolean) => void
  setOrder: (order: TOrder) => void
  setCategory: (catergory: TEventCategory) => void
  setStartDate: (date: Date | null) => void
  setEndDate: (date: Date | null) => void
  setRegionFilter: (filter: GeoFilterType) => void
  setRegion: (region: IGeoData) => void
  setSeoulCheck: (checked: boolean) => void
  setGyenggiCheck: (checked: boolean) => void
  setKeyword: (keyword: string) => void
  filterReset: () => void
  allReset: () => void
}

export const useListFilterStore = create<IListFilter>((set) => ({
  isOpen: false,
  filter: null,
  order: null,
  category: [],
  startDate: null,
  endDate: null,
  regionFilter: null,
  regions: [],
  isSeoulChecked: false,
  isGyeonggiChecked: false,
  keyword: '',
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
  setRegionFilter: (filter: GeoFilterType) => set({ regionFilter: filter }),
  setRegion: (region: IGeoData) =>
    set((state) => {
      const exists = state.regions.some((r) => r.rgntCd === region.rgntCd)
      return {
        regions: exists
          ? state.regions.filter((r) => r.rgntCd !== region.rgntCd)
          : [...state.regions, region],
      }
    }),
  setSeoulCheck: (checked: boolean) => set({ isSeoulChecked: checked }),
  setGyenggiCheck: (checked: boolean) => set({ isGyeonggiChecked: checked }),
  setKeyword: (keyword: string) => set({ keyword: keyword }),
  filterReset: () =>
    set({
      order: null,
      category: [],
      startDate: null,
      endDate: null,
      regions: [],
      isSeoulChecked: false,
      isGyeonggiChecked: false,
    }),
  allReset: () =>
    set({
      keyword: '',
      order: null,
      category: [],
      startDate: null,
      endDate: null,
      regions: [],
      isSeoulChecked: false,
      isGyeonggiChecked: false,
    }),
}))
