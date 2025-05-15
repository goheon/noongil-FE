'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAdminSession from './useAdminSession'
import { adminLogout } from '../adminApi'

const AdminAuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const { isError, isLoading } = useAdminSession()

  useEffect(() => {
    const handleLogout = async () => {
      await adminLogout()
      router.replace('/admin/login')
    }

    if (!isLoading && isError) {
      handleLogout()
    }
  }, [isError, isLoading])

  return <>{children}</>
}

export default AdminAuthGuard
