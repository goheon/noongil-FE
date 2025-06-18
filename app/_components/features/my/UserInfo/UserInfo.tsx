import styles from './UserInfo.module.scss'
import classNames from 'classnames/bind'
import Image from 'next/image'
import { ICON } from '@/public'
import useUserAuth from '../useUserAuth'
import { useMemo } from 'react'

const cx = classNames.bind(styles)

const userIconMap: { [key: string]: any } = {
  google: ICON.google,
  kakao: ICON.kakao,
  naver: ICON.naver,
}

const UserInfo = () => {
  const { userInfo } = useUserAuth()

  const userName = useMemo(() => {
    return userInfo ? userInfo.username : '유저'
  }, [userInfo])

  return (
    <div className={cx('container')}>
      <Image src={ICON.eyes} alt="logo" width={75} height={75} />
      <div className={cx('user-info-box')}>
        <div className={cx('user-name')}>
          <span className={cx('name')}>{userName}</span>
          <span className={cx('greet')}>님 안녕하세요!</span>
        </div>

        {userInfo && userInfo.socialLoginProviderCode && (
          <div className={cx('user-account')}>
            <Image
              src={userIconMap[userInfo.socialLoginProviderCode]}
              alt="icon"
              width={17}
              height={17}
            />
            계정 연동중
          </div>
        )}
      </div>
    </div>
  )
}

export default UserInfo
