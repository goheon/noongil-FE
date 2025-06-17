'use client'

import { useState } from 'react'
import classNames from 'classnames/bind'
import Image from 'next/image'

import { BottomSheet } from '@/app/_components/common'
import { useMapStore } from '@/app/_store/map/useMapStore'

import { ICON } from '@/public'
import styles from './MapListBottomSheet.module.scss'

const cx = classNames.bind(styles)

const MapListBottomSheet = () => {
  const [isListSheetOpen, setIsListSheetOpen] = useState(false)

  return (
    <BottomSheet
      type="map-list"
      isOpen={isListSheetOpen}
      setIsOpen={setIsListSheetOpen}
    >
      <div className={cx('list-wrap')}>
        <div className={cx('counts')}>
          <span className={cx('counts-text')}>전체 5개</span>
        </div>
        <div className={cx('contents')}>
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
      </div>
    </BottomSheet>
  )
}

const ItemCard = () => {
  return (
    <div className={cx('item-card')}>
      <Image className={cx('item-image')} src={''} alt={'alt'} />
      <div className={cx('item-info')}>
        <div className={cx('item-top')}>
          <p className={cx('item-title')}>망그러진 곰 다락방</p>
          <div className={cx('item-location')}>
            <Image
              src={ICON.location_map_list}
              alt="icon"
              width={17}
              height={17}
            />
            <p>서울시 강남구</p>
          </div>
        </div>
        <div className={cx('item-bottom')}>
          <p className={cx('item-period')}>2024. 10. 20 ~ 11. 25</p>
        </div>
      </div>
    </div>
  )
}

export { MapListBottomSheet }
