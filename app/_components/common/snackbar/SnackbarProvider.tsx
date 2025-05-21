'use client'

import { Snackbar } from './Snackbar'
import { useSnackbar } from './useSnackbar'

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const { message, type, duration, isVisible, hideSnackbar } = useSnackbar()

  return (
    <>
      {children}
      {isVisible && (
        <Snackbar
          message={message}
          type={type}
          duration={duration}
          onClose={hideSnackbar}
        />
      )}
    </>
  )
} 