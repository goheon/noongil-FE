'use client'

import localFont from 'next/font/local'
import React, { Suspense } from 'react'
import { usePathname } from 'next/navigation'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/app/_lib'
import { BottomNavigation, Header } from '@/app/_components/common'
import '@/app/_styles'

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// })
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// })

const RootLayout = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname()
  const isExhibition: boolean = pathname.includes('exhibition')

  return (
    <html lang="ko">
      <body className={`pages ${isExhibition ? 'exhibition' : ''}`}>
        <QueryClientProvider client={queryClient}>
          <div className="pages_wrapper">
            <Suspense>
              <Header isExhibition={isExhibition} />
            </Suspense>
            <main className="content">{children}</main>
            <Suspense>
              <BottomNavigation />
            </Suspense>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
