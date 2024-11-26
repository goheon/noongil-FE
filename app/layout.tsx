'use client'

import localFont from 'next/font/local'
import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/app/_lib'
import { Header } from '@/app/_components/common'
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
  return (
    <html lang="ko">
      <body className={``}>
        <QueryClientProvider client={queryClient}>
          <Header />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
