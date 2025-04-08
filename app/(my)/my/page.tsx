'use client'

import { useState, useLayoutEffect } from 'react'
import { useRouter } from 'next/navigation'
import { axiosApi } from '@/app/_lib/axios'
import type { AxiosError } from 'axios'

const MyPage: React.FC = () => {
  const router = useRouter()

  useLayoutEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axiosApi.get('auth/user-info')
        console.log(res)
      } catch (err) {
        const error = err as AxiosError
        if (error.response?.status === 401) router.push('/login')
      }
    }

    checkLogin()
  }, [])

  return <>{<span>mypage</span>}</>
}

export default MyPage
