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
        console.log(res)
        setLoadEnd()
      } catch (err) {
        const error = err as AxiosError
        if (error.response?.status === 401) {
          router.push('/login')
        } else {
          // 현위치 에러페이지 이동 및 에러코드 전달
          router.replace('/')
        }
      }
    }

    checkLogin()
  }, [])

  if (!loadEnd) return null
  return <MyPage />
}

export default Page
