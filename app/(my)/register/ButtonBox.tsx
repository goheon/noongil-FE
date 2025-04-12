'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames/bind'

import Modal from '../../_components/common/modal/Modal'
import { axiosApi, useRegisterStore } from '@/app/_lib'
import type { AxiosError } from 'axios'

import styles from './page.module.scss'

const cx = classNames.bind(styles)

const ButtonBox = () => {
  const router = useRouter()
  const resetAll = useRegisterStore((state) => state.resetAll)
  const { selectedFavPU, selectedFavEHB } = useRegisterStore()

  const [modalProps, setModalProps] = useState<{
    isOpen: boolean
    title?: string
    message: string
    onOk: () => void
    onCancel?: () => void
  }>({
    isOpen: false,
    title: '',
    message: '',
    onOk: () => {},
  })

  const postRegister = useCallback(
    async (isSkip: boolean, favEHB: string[], favPU: string[]) => {
      let userId
      try {
        const res = await axiosApi.get('auth/user-info')
        userId = res.data.userId
      } catch (err) {
        const error = err as AxiosError
        setModalProps({
          isOpen: true,
          title: `오류 발생`,
          message: `${error.response?.data}`,
          onOk: () => {
            setModalProps({ ...modalProps, isOpen: false })
            router.replace('/')
          },
        })
      }

      if (isSkip) {
        try {
          const res = await axiosApi.post('user/signup', {
            userId: userId,
            categories: [],
          })
          if (res.status === 200) {
            setModalProps({
              ...modalProps,
              isOpen: true,
              message: '회원가입이 완료되었어요.',
              onOk: () => {
                setModalProps({ ...modalProps, isOpen: false })
                router.replace('/')
              },
            })
          } else {
            setModalProps({
              ...modalProps,
              isOpen: true,
              title: `오류 발생`,
              message: `code not 200`,
              onOk: () => {
                setModalProps({ ...modalProps, isOpen: false })
                router.replace('/')
              },
            })
          }
        } catch (err) {
          const error = err as AxiosError
          setModalProps({
            ...modalProps,
            isOpen: true,
            title: `오류 발생`,
            message: `${error.response?.data}`,
            onOk: () => {
              setModalProps({ ...modalProps, isOpen: false })
              router.replace('/')
            },
          })
        }
      } else {
        try {
          const res = await axiosApi.post('user/signup', {
            userId: userId,
            categories: [...favEHB, ...favPU],
          })
          if (res.status === 200) {
            setModalProps({
              ...modalProps,
              isOpen: true,
              message: '회원가입이 완료되었어요.',
              onOk: () => {
                setModalProps({ ...modalProps, isOpen: false })
                router.replace('/')
              },
            })
          } else {
            setModalProps({
              ...modalProps,
              isOpen: true,
              title: `오류 발생`,
              message: `code not 200`,
              onOk: () => {
                setModalProps({ ...modalProps, isOpen: false })
                router.replace('/')
              },
            })
          }
        } catch (err) {
          const error = err as AxiosError
          setModalProps({
            ...modalProps,
            isOpen: true,
            title: `오류 발생`,
            message: `${error.response?.data}`,
            onOk: () => {
              setModalProps({ ...modalProps, isOpen: false })
              router.replace('/')
            },
          })
        }
      }
    },
    [],
  )

  return (
    <div className={cx('button-box')}>
      <button
        className={cx('skip-button')}
        type="button"
        onClick={() =>
          setModalProps({
            ...modalProps,
            isOpen: true,
            // title: '!!',
            message: '관심사 선택을 건너뛰시겠어요?',
            onCancel: () => {
              setModalProps({ ...modalProps, isOpen: false })
            },
            onOk: () => {
              postRegister(true, [], [])
            },
          })
        }
      >
        건너뛰기
      </button>

      <div className={cx('button-wrap')}>
        <button
          className={cx('reset-button', 'button')}
          type="button"
          onClick={resetAll}
        >
          초기화
        </button>
        <button
          className={cx('submit-button', 'button')}
          type="button"
          onClick={() => postRegister(true, selectedFavPU, selectedFavEHB)}
        >
          눈길 시작하기
        </button>
      </div>
      <Modal {...modalProps} />
    </div>
  )
}

export { ButtonBox }
