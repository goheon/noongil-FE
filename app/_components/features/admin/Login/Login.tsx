'use client'

import styles from './Login.module.scss'
import classNames from 'classnames/bind'
import Image from 'next/image'
import { ICON } from '@/public'
import { useForm } from 'react-hook-form'
import useAdminLogin from './useAdminLogin'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

type LoginForm = {
  id: string
  password: string
}

const cx = classNames.bind(styles)

const Login = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  const { adminLogin } = useAdminLogin()

  const onSubmit = (data: LoginForm) => {
    adminLogin(data)
  }

  return (
    <div className={cx('container')}>
      <div className={cx('login-box')}>
        <Image src={ICON.eyes} alt="logo" width={40} height={40} />

        <form className={cx('login-form')} onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="id" {...register('id')} />
          <input
            placeholder="password"
            type="password"
            {...register('password')}
          />

          <button>submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login
