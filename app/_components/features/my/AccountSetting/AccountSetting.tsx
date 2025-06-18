'use client'

import styles from './AccountSetting.module.scss'
import classNames from 'classnames/bind'
import useUserAuth from '../useUserAuth'

const cx = classNames.bind(styles)

const AccountSetting = () => {
  const { deleteUser } = useUserAuth()

  return (
    <div className={cx('container')}>
      <button className={cx('delete-user-btn')} onClick={() => deleteUser()}>
        회원 탈퇴하기
      </button>
    </div>
  )
}

export default AccountSetting
