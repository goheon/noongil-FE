'use client'

import { adminLogin } from '../adminApi'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const useAdminLogin = () => {
  const router = useRouter()

  // 로그인 기능
  const loginMutation = useMutation({
    mutationFn: (loginData: { id: string; password: string }) =>
      adminLogin(loginData),
    onSuccess: () => {
      router.push('/admin/eventlist')
    },
    onError: (error) => {
      console.log('login err :', error)
    },
  })

  return {
    adminLogin: loginMutation.mutateAsync,
  }
}

export default useAdminLogin
