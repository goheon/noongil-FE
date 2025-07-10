'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'

import { useMapFilterStore } from '@/app/_store/map/useMapFilterStore'
import { axiosApi } from '@/app/_lib'

import { TEventCategory } from '@/app/_types'
import {
  POPUP_CATEGORY_LABELS,
  EXHIBITION_CATEGORY_LABELS,
} from '@/app/_constants/event'

import styles from './CategoryFilterBox.module.scss'

const cx = classNames.bind(styles)

const ALL_CATEGORY_LABELS = {
  ...POPUP_CATEGORY_LABELS,
  ...EXHIBITION_CATEGORY_LABELS,
}

export const CategoryFilterBox = () => {
  const { data } = useUserCategoriesQuery()
  const favCategories = data?.data as TEventCategory[] | []

  return (
    <div className={cx('map-category-filter-box')}>
      {favCategories?.map((category, idx) => (
        <CategoryChipButton category={category as TEventCategory} key={idx} />
      ))}
    </div>
  )
}

// 사용자 선호 카테고리 버튼
const CategoryChipButton = ({ category }: { category: TEventCategory }) => {
  const { selectedCategories, setSelectedCategories } = useMapFilterStore()

  const isActive = selectedCategories.includes(category)

  const handleClick = () => {
    if (isActive) {
      const cleaned = selectedCategories.filter((filter) => filter !== category)
      setSelectedCategories(cleaned)
    } else {
      const added = [...selectedCategories, category]
      setSelectedCategories(added)
    }
  }

  return (
    <div
      className={cx('category-chip-button', { active: isActive })}
      onClick={handleClick}
    >
      <p className={cx('chip-label')}>{ALL_CATEGORY_LABELS[category]}</p>
    </div>
  )
}

// 카테고리 조회 쿼리 훅
const useUserCategoriesQuery = () => {
  return useQuery({
    queryKey: ['map-user-categories'],
    queryFn: getUserCategories,
  })
}

// 카테고리 조회 쿼리함수
const getUserCategories = async () => {
  try {
    const { data: userCategories } = await axiosApi.get('user-categories')
    return userCategories
  } catch (err) {
    return err
  }
}
