'use client'

import styles from './layout.module.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AdminAuthGuard from '@/app/_components/features/admin/AdminAuthGuard/AdminAuthGuard'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <section className={`${styles['container']}`}>
      {(() => {
        switch (true) {
          case pathname.includes('login'):
            return children

          default:
            return (
              <AdminAuthGuard>
                <div className={`${styles['sidebar']}`}>
                  <Link href="/admin/eventlist">
                    <div className={`${styles['tab']}`}>이벤트 관리</div>
                  </Link>
                </div>

                <div className={`${styles['content']}`}>{children}</div>
              </AdminAuthGuard>
            )
        }
      })()}
    </section>
  )
}
