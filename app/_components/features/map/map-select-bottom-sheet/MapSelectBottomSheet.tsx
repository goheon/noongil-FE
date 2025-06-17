'use client'

import { useState } from 'react'
import classNames from 'classnames/bind'
import Image from 'next/image'

import { BottomSheet } from '@/app/_components/common'
import { useMapStore } from '@/app/_store/map/useMapStore'

import { ICON } from '@/public'
import styles from './MapSelectBottomSheet.module.scss'

const cx = classNames.bind(styles)

const MapSelectBottomSheet = () => {
  const [isSelectSheetOpen, setIsSelectSheetOpen] = useState(true)

  return (
    <BottomSheet
      type="map-select"
      isOpen={isSelectSheetOpen}
      setIsOpen={setIsSelectSheetOpen}
    >
      <div className={cx('select-wrap', innerHeight < 741 ? 'large' : '')}>
        <ItemCard />
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
          <div className={cx('item-status-chip')}>진행중</div>
          <div className={cx('item-title')}>먼작귀 팝업</div>
          <div className={cx('item-location')}>
            <Image
              src={ICON.location_map_list}
              alt="icon"
              width={17}
              height={17}
            />
            <p>더현대 서울 8F</p>
          </div>
        </div>
        <div className={cx('item-bottom')}>
          <p className={cx('item-period')}>2024. 10. 20 ~ 11. 25</p>
        </div>
      </div>
    </div>
  )
}

export { MapSelectBottomSheet }
