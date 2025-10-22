import { create } from 'zustand'

import { TEventCategory } from '@/app/_types'

export type EventType = 'popup' | 'exhibition' | 'all'
export type DateType = 'today' | 'weekend' | 'nearOpen' | ''

interface MapFilterState {
  selectedCategories: TEventCategory[]
  selectedType: EventType
  selectedDateType: DateType
  selectedDates: [Date | null, Date | null]
  page: number
  latitude: number | null
  longitude: number | null
  setSelectedCategories: (categories: TEventCategory[]) => void
  setSelectedType: (type: EventType) => void
  setSelectedDateType: (dateType: DateType) => void
  setSelectedDates: (dates: [Date | null, Date | null]) => void
  setPage: (newPage: number) => void
  setLocationFilter: (latitude: number | null, longitude: number | null) => void
}

const initialState = {
  selectedCategories: [],
  selectedType: 'all' as EventType,
  selectedDateType: '' as DateType,
  selectedDates: [null, null] as [Date | null, Date | null],
  page: 0,
  latitude: null as number | null,
  longitude: null as number | null,
}

export const useMapFilterStore = create<MapFilterState>((set) => ({
  ...initialState,
  setSelectedCategories: (categories) =>
    set({ selectedCategories: categories }),
  setSelectedType: (type) => set({ selectedType: type }),
  setSelectedDateType: (dateType) => set({ selectedDateType: dateType }),
  setSelectedDates: (dates) => set({ selectedDates: dates }),
  setPage: (newPage) => set({ page: newPage }),
  setLocationFilter: (latitude, longitude) =>
    set({ latitude, longitude, page: 0 }),
}))
