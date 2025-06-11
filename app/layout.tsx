import './_styles'
import 'react-loading-skeleton/dist/skeleton.css'
import ClientRootLayout from './ClientRootLayout'

export const metadata = {
  title: {
    default: '눈길 noongil',
    template: '%s | 눈길 noongil',
  },
  description: '...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  )
}
