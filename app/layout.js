'use client'

import localFont from 'next/font/local'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <html lang="ko">
      <body className={``}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
