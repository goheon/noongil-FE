'use client'

import React, { useLayoutEffect, Suspense } from 'react'
import { usePathname } from 'next/navigation'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SnackbarProvider } from './_components/common/snackbar/SnackbarProvider'

import { queryClient } from '@/app/_lib'
import { BottomNavigation, Header } from '@/app/_components/common'
import '@/app/_styles'
import 'react-loading-skeleton/dist/skeleton.css'

const RootLayout = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname()
  const isExhibition: boolean = pathname.includes('exhibition')
  const isRegister: boolean = pathname.includes('register')
  const isAdmin: boolean = pathname.includes('admin')

  useLayoutEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setViewportHeight()

    window.addEventListener('resize', setViewportHeight)
    return () => {
      window.removeEventListener('resize', setViewportHeight)
    }
  }, [])

  return (
    <html lang="ko">
      <body className={`pages ${isExhibition ? 'exhibition' : ''}`}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            {isAdmin ? (
              <main className="content">{children}</main>
            ) : (
              <div className="pages_wrapper">
                <Suspense>
                  {isRegister ? (
                    children
                  ) : (
                    <>
                      <Header isExhibition={isExhibition} />
                      <main className="content">{children}</main>
                      <BottomNavigation />
                    </>
                  )}
                </Suspense>
              </div>
            )}
          </SnackbarProvider>

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
