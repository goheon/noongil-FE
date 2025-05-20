import { create } from 'zustand';

export type EventType = 'POPUP' | 'EXHIBITION' | 'ALL';

interface MapFilterState {
  selectedCategory: string | null;
  selectedType: EventType;
  selectedDate: Date | null;
  setSelectedCategory: (category: string | null) => void;
  setSelectedType: (type: EventType) => void;
  setSelectedDate: (date: Date | null) => void;
  resetFilters: () => void;
}

const initialState = {
  selectedCategory: null,
  selectedType: 'ALL' as EventType,
  selectedDate: null,
};

export const useMapFilterStore = create<MapFilterState>((set) => ({
  ...initialState,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedType: (type) => set({ selectedType: type }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  resetFilters: () => set(initialState),
}));
