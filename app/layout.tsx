import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import ClientRootLayout from './ClientRootLayout'

import '@/app/_styles'
import 'react-loading-skeleton/dist/skeleton.css'

export const metadata = {
  title: {
    default: '눈길 noongil',
    template: '%s | 눈길 noongil',
  },
  description: '...',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <GoogleTagManager gtmId={process.env.NEXT_GA4_ID as string} />
      <GoogleAnalytics gaId={process.env.NEXT_GTM_ID as string} />
      <body className="pages">
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  )
}
