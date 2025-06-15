'use client'

import classNames from 'classnames/bind'

import { useMapFilterStore } from '@/app/_store/map/useMapFilterStore'

import {
  POPUP_CATEGORY_LABELS,
  EXHIBITION_CATEGORY_LABELS,
} from '@/app/_constants/event'
import { TEventCategory } from '@/app/_types'
import styles from './CategoryFilterBox.module.scss'

const cx = classNames.bind(styles)

const CATEGORY_CHIP_BUTTON_LIST = ['PASH', 'CHAR', 'FANDB']

const ALL_CATEGORY_LABELS = {
  ...POPUP_CATEGORY_LABELS,
  ...EXHIBITION_CATEGORY_LABELS,
}

export const CategoryFilterBox = () => {
  return (
    <div className={cx('map-category-filter-box')}>
      {CATEGORY_CHIP_BUTTON_LIST.map((category, idx) => (
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
