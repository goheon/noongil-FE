import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface KeywordHistoryState {
  histories: string[]
  addHistory: (keyword: string) => void
  removeHistory: (keyword: string) => void
  clearHistory: () => void
}

const MAX_HISTORY_LENGTH = 5

export const useKeywordHistoryStore = create(
  persist<KeywordHistoryState>(
    (set, get) => ({
      histories: [],

      addHistory: (keyword) => {
        const newHistories = [
          keyword,
          ...get().histories.filter((h) => h !== keyword),
        ].slice(0, MAX_HISTORY_LENGTH)

        set({ histories: newHistories })
      },

      removeHistory: (keyword) => {
        const filtered = get().histories.filter((item) => item !== keyword)
        set({ histories: filtered })
      },

      clearHistory: () => {
        set({ histories: [] })
      },
    }),
    {
      name: 'keywordHistories', // localStorage key
      // storage: createJSONStorage(() => sessionStorage), // 원하면 이렇게 storage 지정도 가능
    },
  ),
)
