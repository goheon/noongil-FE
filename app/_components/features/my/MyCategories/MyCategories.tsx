'use client'

import styles from './MyCategories.module.scss'
import classNames from 'classnames/bind'
import useMyCategories from '../useMyCategories'
import {
  POPUP_CATEGORY_VALUES,
  EXHIBITION_CATEGORY_VALUES,
} from '@/app/_constants/event'
import CategorySection from './CategorySection'

const cx = classNames.bind(styles)

const MyCategories = () => {
  const {
    handlePopupCategories,
    handleExhibitionCategories,
    selectedPopupCategories,
    selectedExhibitionCategories,
  } = useMyCategories()

  return (
    <div className={cx('container')}>
      <CategorySection
        title="팝업"
        categories={POPUP_CATEGORY_VALUES}
        selectedCategories={selectedPopupCategories}
        handleCategories={handlePopupCategories}
      />
      <CategorySection
        title="전시"
        categories={EXHIBITION_CATEGORY_VALUES}
        selectedCategories={selectedExhibitionCategories}
        handleCategories={handleExhibitionCategories}
      />
    </div>
  )
}

export default MyCategories
