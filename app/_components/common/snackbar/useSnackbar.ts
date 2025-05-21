import { create } from 'zustand'

interface SnackbarState {
  message: string
  type: 'success' | 'error' | 'info'
  duration: number
  isVisible: boolean
  showSnackbar: (props: { message: string; type?: 'success' | 'error' | 'info'; duration?: number }) => void
  hideSnackbar: () => void
}

export const useSnackbar = create<SnackbarState>((set) => ({
  message: '',
  type: 'info',
  duration: 3000,
  isVisible: false,
  showSnackbar: ({ message, type = 'info', duration = 3000 }) =>
    set({ message, type, duration, isVisible: true }),
  hideSnackbar: () => set({ isVisible: false }),
})) 