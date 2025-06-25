import { create } from 'zustand'

interface KeywordHistoryState {
  histories: string[]
  addHistory: (keyword: string) => void
  removeHistory: (keyword: string) => void
  clearHistory: () => void
}

const MAX_HISTORY_LENGTH = 5

export const useKeywordHistoryStore = create<KeywordHistoryState>((set) => ({
  histories: JSON.parse(localStorage.getItem('keywordHistories') || '[]'),

  addHistory: (keyword: string) => {
    set((state) => {
      const newHistories = [
        keyword,
        ...state.histories.filter((h) => h !== keyword),
      ].slice(0, MAX_HISTORY_LENGTH)
      localStorage.setItem('keywordHistories', JSON.stringify(newHistories))
      return { histories: newHistories }
    })
  },

  removeHistory: (keyword: string) => {
    set((state) => {
      const filtered = state.histories.filter((item) => item !== keyword)
      localStorage.setItem('keywordHistories', JSON.stringify(filtered))
      return { histories: filtered }
    })
  },

  clearHistory: () => {
    localStorage.removeItem('keywordHistories')
    set({ histories: [] })
  },
}))
