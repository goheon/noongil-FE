'use Client'

import classNames from 'classnames/bind'

import styles from './CategoryFilterBox.module.scss'

const cx = classNames.bind(styles)

const CATEGORY_CHIP_BUTTON_LIST = [
  '패션',
  '캐릭터',
  '식음료(F&B)',
  '뷰티',
  'IT',
  '라이프스타일',
  '엔터',
]

export const CategoryFilterBox = () => {
  return (
    <div className={cx('map-category-filter-box')}>
      {
        CATEGORY_CHIP_BUTTON_LIST.map((category, idx) => (
          <CategoryChipButton category={category} key={idx} />
        ))
      }
    </div>
  )
}

// 사용자 선호 카테고리 버튼
const CategoryChipButton = ({ category }: { category: string }) => {
  return <div className={cx('category-chip-button')} >
  <p className={cx('chip-label')}>{category}</p>
</div>
}
