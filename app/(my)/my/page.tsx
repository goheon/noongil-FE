'use client'

import { useLayoutEffect } from 'react'
import { useRouter } from 'next/navigation'

import MyPage from '@/app/_components/features/my/MyPage'

import { axiosApi, useLoginStore } from '@/app/_lib'
import type { AxiosError } from 'axios'

const Page: React.FC = () => {
  const router = useRouter()
  const { loadEnd, setLoadEnd } = useLoginStore()

  useLayoutEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axiosApi.get('auth/user-info')
        if (res?.data?.joinYn === 'N') {
          setLoadEnd(false)
          router.push('/register')
          return
        }
      } catch (err) {
        const error = err as AxiosError
        if (error.response?.status === 401) {
          setLoadEnd(false)
          router.push('/login')
          return
        } else {
          // 현위치 에러페이지 이동 및 에러코드 전달
          setLoadEnd(false)
          router.replace('/')
          return
        }
      }

      setTimeout(() => setLoadEnd(true), 200)
    }

    checkLogin()
  }, [])

  if (!loadEnd) return null
  return <MyPage />
}

export default Page
