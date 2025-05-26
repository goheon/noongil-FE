'use client'

import styles from './CustomList.module.scss'
import classNames from 'classnames/bind'
import { Chip } from '@/app/_components/ui'
import { useRouter } from 'next/navigation'

const cx = classNames.bind(styles)

// TODO: 추천리스트 API 완성시 수정

const CustomList = () => {
  const router = useRouter()

  return (
    <div className={cx('container')}>
      <div className={cx('top-section')}>
        <div className={cx('title')}>당신에게 딱 맞는 팝업</div>
      </div>
      <div className={cx('info-section-container')}>
        <div className={cx('info-section')}>
          <div className={cx('headline')}>로그인이 필요해요</div>
          <div className={cx('subline')}>
            당신에게 딱 맞는 팝업이 기다리고 있어요
          </div>
          <Chip
            className={cx('login-chip')}
            onClick={() => router.push('/login')}
          >
            로그인
          </Chip>
        </div>
      </div>
    </div>
  )
}

export default CustomList
