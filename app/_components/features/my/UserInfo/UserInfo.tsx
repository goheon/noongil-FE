import styles from './UserInfo.module.scss'
import classNames from 'classnames/bind'
import Image from 'next/image'
import { ICON } from '@/public'

const cx = classNames.bind(styles)

const UserInfo = () => {
  return (
    <div className={cx('container')}>
      <Image src={ICON.eyes} alt="logo" width={75} height={75} />
      <div className={cx('user-info-box')}>
        <div className={cx('user-name')}>
          <span className={cx('name')}>부리부리 대마왕</span>
          <span className={cx('greet')}>님 안녕하세요!</span>
        </div>
        <div className={cx('user-account')}>
          <Image src={ICON.google} alt="icon" width={17} height={17} />
          계정 연동중
        </div>
      </div>
    </div>
  )
}

export default UserInfo
