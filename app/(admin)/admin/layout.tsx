'use client'

import styles from './layout.module.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import useAdminAuthStatus from '@/app/_components/features/admin/Login/useAdminAuthStatus'
import { useEffect } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  const isLoginPage = pathname.includes('login')

  // const { adminUser, isLoading } = useAdminAuthStatus(!isLoginPage)

  // console.log('admin :', adminUser)

  // useEffect(() => {
  //   if (!isLoginPage && !isLoading && !adminUser) {
  //     router.push('/admin/login')
  //   }
  // }, [isLoginPage, isLoading, adminUser, router])

  return (
    <section className={`${styles['container']}`}>
      {(() => {
        switch (true) {
          case pathname.includes('login'):
            return children

          default:
            return (
              <>
                <div className={`${styles['sidebar']}`}>
                  <Link href="/admin/eventlist">
                    <div className={`${styles['tab']}`}>이벤트 관리</div>
                  </Link>
                </div>

                <div className={`${styles['content']}`}>{children}</div>
              </>
            )
        }
      })()}
    </section>
  )
}
