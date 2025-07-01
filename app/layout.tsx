import ClientRootLayout from './ClientRootLayout'

import 'react-loading-skeleton/dist/skeleton.css'
import '@/app/_styles'

export const metadata = {
  title: {
    default: '눈길 noongil',
    template: '%s | 눈길 noongil',
  },
  description: '...',
  viewport:
    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="pages">
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  )
}
