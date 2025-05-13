'use client'

import styles from './MyCategories.module.scss'
import classNames from 'classnames/bind'
import useMyCategories from '../useMyCategories'
import {
  POPUP_CATEGORY_VALUES,
  POPUP_CATEGORY_LABELS,
  EXHIBITION_CATEGORY_VALUES,
  EXHIBITION_CATEGORY_LABELS,
} from '@/app/_constants/event'

const cx = classNames.bind(styles)

const MyCategories = () => {
  const { selectedCategories, handleCategories, updateCategories } =
    useMyCategories()

  return (
    <div className={cx('container')}>
      <div className={cx('section')}>
        <div className={cx('title')}>팝업</div>

        <ul className={cx('list')}>
          {POPUP_CATEGORY_VALUES.map((value) => (
            <li className={cx('list-item')} key={value}>
              <label className={cx('name')}>
                {POPUP_CATEGORY_LABELS[value]}

                <input
                  type="checkbox"
                  checked={selectedCategories.includes(value)}
                  onChange={() => handleCategories(value)}
                />
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className={cx('section')}>
        <div className={cx('title')}>전시</div>

        <ul className={cx('list')}>
          {EXHIBITION_CATEGORY_VALUES.map((value) => (
            <li className={cx('list-item')} key={value}>
              <label className={cx('name')}>
                {EXHIBITION_CATEGORY_LABELS[value]}

                <input
                  type="checkbox"
                  checked={selectedCategories.includes(value)}
                  onChange={() => handleCategories(value)}
                />
              </label>
            </li>
          ))}
        </ul>
      </div>

      <button className={cx('update-btn')} onClick={() => updateCategories()}>
        수정하기
      </button>
    </div>
  )
}

export default MyCategories
