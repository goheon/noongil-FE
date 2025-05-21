import { create } from 'zustand';

export type EventType = 'POPUP' | 'EXHIBITION' | 'ALL';

interface MapFilterState {
  selectedCategories: string[];
  selectedType: EventType;
  selectedDate: Date | null;
  setSelectedCategories: (categories: string[]) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  setSelectedType: (type: EventType) => void;
  setSelectedDate: (date: Date | null) => void;
  resetFilters: () => void;
}

const initialState = {
  selectedCategories: [],
  selectedType: 'ALL' as EventType,
  selectedDate: null,
};

export const useMapFilterStore = create<MapFilterState>((set) => ({
  ...initialState,
  setSelectedCategories: (categories) => set({ selectedCategories: categories }),
  addCategory: (category) => 
    set((state) => ({
      selectedCategories: [...state.selectedCategories, category]
    })),
  removeCategory: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.filter((c) => c !== category)
    })),
  setSelectedType: (type) => set({ selectedType: type }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  resetFilters: () => set(initialState),
}));
