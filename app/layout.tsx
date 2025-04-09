'use client'

import React, { Suspense } from 'react'
import { usePathname } from 'next/navigation'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/app/_lib'
import { BottomNavigation, Header } from '@/app/_components/common'
import '@/app/_styles'
import 'react-loading-skeleton/dist/skeleton.css'

const RootLayout = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname()
  const isExhibition: boolean = pathname.includes('exhibition')
  const isRegister: boolean = pathname.includes('register')
  const isAdmin: boolean = pathname.includes('admin')

  return (
    <html lang="ko">
      <body className={`pages ${isExhibition ? 'exhibition' : ''}`}>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
