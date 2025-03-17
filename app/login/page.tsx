'use client'

import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { getNaverLogin, getKakaoLogin, getGoogleLogin } from './loginApi'
import { ICON } from '@/public'
import styles from './LoginPage.module.scss'

const LoginPage: React.FC = () => {
  const {
    data: naverLogin,
    isLoading: naverIsLoading,
    refetch: naverRefetch,
  } = useQuery({
    queryKey: ['naver-login'],
    queryFn: () => getNaverLogin(),
    enabled: false,
    retry: 0,
  })
  const {
    data: kakaoLogin,
    isLoading: kakaoIsLoading,
    refetch: kakaoRefetch,
  } = useQuery({
    queryKey: ['naver-login'],
    queryFn: () => getKakaoLogin(),
    enabled: false,
    retry: 0,
  })
  const {
    data: googleLogin,
    isLoading: googleIsLoading,
    refetch: googleRefetch,
  } = useQuery({
    queryKey: ['naver-login'],
    queryFn: () => getGoogleLogin(),
    enabled: false,
    retry: 0,
  })

  return (
    <div className={`${styles.LoginPage}`}>
      <div className={`${styles['icon-box']}`}>
        <Image
          className={`${styles['icon']} ${styles['eyes-icon']}`}
          src={ICON.eyes}
          alt="noongil Icon"
          width={80}
          height={80}
        />
        <h2 className={`${styles['title']}`}>눈길</h2>
      </div>
      <div className={`${styles['button-box']}`}>
        <button
          className={`${styles['button']} ${styles['naver']}`}
          type="button"
          onClick={() => naverRefetch()}
        >
          <Image
            className={`${styles['icon']} ${styles['naver-icon']}`}
            src={ICON.naver}
            alt="naver Icon"
            width={50}
            height={50}
          />
          <span>네이버 로그인</span>
        </button>
        <button
          className={`${styles['button']} ${styles['kakao']}`}
          type="button"
          onClick={() => kakaoRefetch()}
        >
          <Image
            className={`${styles['icon']} ${styles['kakao-icon']}`}
            src={ICON.kakao}
            alt="kakao Icon"
            width={50}
            height={50}
          />
          <span>카카오 로그인</span>
        </button>
        <button
          className={`${styles['button']} ${styles['google']}`}
          type="button"
          onClick={() => googleRefetch()}
        >
          <Image
            className={`${styles['icon']} ${styles['google-icon']}`}
            src={ICON.google}
            alt="google Icon"
            width={45}
            height={45}
          />
          <span>Google 로그인</span>
        </button>
      </div>
    </div>
  )
}

export default LoginPage
