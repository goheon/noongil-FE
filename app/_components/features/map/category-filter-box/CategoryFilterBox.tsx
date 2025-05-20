'use Client'

import classNames from 'classnames/bind'

import styles from './CategoryFilterBox.module.scss'

const cx = classNames.bind(styles)

export const CategoryFilterBox = () => {
  return (
    <div className={cx('map-category-filter-box')}>
      <div className={cx('category-chip-button')}>
        <p className={cx('chip-label')}>카테고리1</p>
      </div>
      <div className={cx('category-chip-button')}>
        <p>카테고리1</p>
      </div>
      <div className={cx('category-chip-button')}>
        <p>카테고리1</p>
      </div>
      <div className={cx('category-chip-button')}>
        <p>카테고리1</p>
      </div>
      <div className={cx('category-chip-button')}>
        <p>카테고리1</p>
      </div>
      <div className={cx('category-chip-button')}>
        <p>카테고리1</p>
      </div>
    </div>
  )
}
