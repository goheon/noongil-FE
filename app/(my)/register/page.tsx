'use client'

import { useCallback } from 'react'
import classNames from 'classnames/bind'

import { ButtonBox } from './ButtonBox'
import CategorySection from '@/app/_components/features/my/MyCategories/CategorySection'
import {
  POPUP_CATEGORY_VALUES,
  EXHIBITION_CATEGORY_VALUES,
} from '@/app/_constants/event'
import { useSnackbar } from '@/app/_components/common/snackbar/useSnackbar'

import { useRegisterStore } from '@/app/_lib'

import styles from './page.module.scss'
const cx = classNames.bind(styles)

const RegisterPage = () => {
  const { selectedFavPU, selectedFavEHB, setSelectedFavEHB, setSelectedFavPU } =
    useRegisterStore()

  const { showSnackbar } = useSnackbar()

  const showLimitSnack = useCallback(
    () =>
      showSnackbar({
        message: '카테고리별 3개까지 지정할 수 있습니다.',
        type: 'info',
        duration: 2000,
      }),
    [],
  )

  // wow
  const handler = useCallback(
    (values: string[], setter: (value: string[]) => void) =>
      (value: string) => {
        const isIncluded = values.includes(value)
        let newValues
        if (isIncluded) {
          newValues = values.filter((c) => c !== value)
        } else {
          newValues = [...values, value]
          if (newValues.length > 3) {
            return showLimitSnack()
          }
        }
        setter(newValues)
      },
    [setSelectedFavPU, setSelectedFavEHB, showLimitSnack],
  )

  return (
    <>
      <TitleBox />
      <div className={cx('container')}>
        <CategorySection
          title="팝업"
          categories={POPUP_CATEGORY_VALUES}
          selectedCategories={selectedFavPU}
          handleCategories={handler(selectedFavPU, setSelectedFavPU)}
        />
        <CategorySection
          title="전시"
          categories={EXHIBITION_CATEGORY_VALUES}
          selectedCategories={selectedFavEHB}
          handleCategories={handler(selectedFavEHB, setSelectedFavEHB)}
        />
      </div>
      <ButtonBox />
    </>
  )
}

const TitleBox = () => {
  return (
    <div className={cx('title-box')}>
      <h1 className={cx('title')}>내 관심사</h1>
      <p className={cx('description')}>당신의 눈길이 머무는 곳으로</p>
    </div>
  )
}

export default RegisterPage
