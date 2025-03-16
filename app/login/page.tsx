import Image from 'next/image'
import { ICON } from '@/public'

import styles from './LoginPage.module.scss'

export const metadata = {
  title: '눈길 noongil',
  description: '...',
}

const LoginPage: React.FC = () => {
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
