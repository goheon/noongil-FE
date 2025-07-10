import { create } from 'zustand'

import { TEventCategory } from '@/app/_types'

export type EventType = 'popup' | 'exhibition' | 'all'
export type DateType = 'today' | 'weekend' | 'nearOpen' | ''

interface MapFilterState {
  selectedCategories: TEventCategory[]
  selectedType: EventType
  seletedDateType: DateType
  selectedDates: [Date | null, Date | null]
  setSelectedCategories: (categories: TEventCategory[]) => void
  setSelectedType: (type: EventType) => void
  setSelectedDateType: (dateType: DateType) => void
  setSelectedDates: (dates: [Date | null, Date | null]) => void
}

const initialState = {
  selectedCategories: [],
  selectedType: 'all' as EventType,
  seletedDateType: '' as DateType,
  selectedDates: [null, null] as [Date | null, Date | null],
}

export const useMapFilterStore = create<MapFilterState>((set) => ({
  ...initialState,
  setSelectedCategories: (categories) =>
    set({ selectedCategories: categories }),
  setSelectedType: (type) => set({ selectedType: type }),
  setSelectedDateType: (dateType) => set({ seletedDateType: dateType }),
  setSelectedDates: (dates) => set({ selectedDates: dates }),
}))
