'use client'

import Image from 'next/image'
import classNames from 'classnames/bind'

import { useMapStore } from '@/app/_store/map/useMapStore'

import { ICON } from '@/public'
import styles from './FilterBox.module.scss'

const cx = classNames.bind(styles)

const FilterBox = () => {
  const { isFilterOpen, setIsFilterOpen } = useMapStore()
  return (
    <>
      {isFilterOpen && (
        <div className={cx('filter-box')}>
          <div className={cx('filter-box-header')}>
            <Image
              src={ICON.x_icon_black}
              alt="close"
              width={24}
              height={24}
              onClick={() => setIsFilterOpen(false)}
            />
            <p>필터</p>
          </div>
        </div>
      )}
    </>
  )
}

export { FilterBox }
