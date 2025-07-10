'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import classNames from 'classnames/bind'

import { BottomSheet } from '@/app/_components/common'
import { useMapStore } from '@/app/_store/map/useMapStore'

import { formatRange } from '../map-list-bottom-sheet/MapListBottomSheet'

import { ICON } from '@/public'
import styles from './MapSelectBottomSheet.module.scss'

const cx = classNames.bind(styles)

const MapSelectBottomSheet = () => {
  const isSelectSheetOpen = useMapStore((s) => s.isSelectSheetOpen)
  const setIsSelectSheetOpen = useMapStore((s) => s.setIsSelectSheetOpen)
  const [height, setHeight] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHeight(window.innerHeight)
    }
  }, [])

  return (
    <BottomSheet
      type="map-select"
      isOpen={isSelectSheetOpen}
      setIsOpen={setIsSelectSheetOpen}
    >
      <div
        className={cx(
          'select-wrap',
          height !== null && height < 741 ? 'large' : '',
        )}
      >
        <ItemCard />
      </div>
    </BottomSheet>
  )
}

const ItemCard = () => {
  const selectedEvent = useMapStore((s) => s.selectedEvent)
  const router = useRouter()

  const handleClick = () => {
    if (!selectedEvent) return

    if (selectedEvent.eventTypeCd === '10') {
      router.push(`/lists/popup/${selectedEvent.eventId}`)
    } else if (selectedEvent.eventTypeCd === '20') {
      router.push(`/lists/exhibition/${selectedEvent.eventId}`)
    }
  }

  return (
    <div className={cx('item-card')} onClick={handleClick}>
      <div className={cx('image-wrapper')}>
        <Image
          className={cx('item-image')}
          src={selectedEvent?.imageUrl ?? ''}
          alt={'alt'}
          fill
        />
      </div>
      <div className={cx('item-info')}>
        <div className={cx('item-top')}>
          <div className={cx('item-status-chip')}>진행중</div>
          <div className={cx('item-title')}>{selectedEvent?.eventNm}</div>
          <div className={cx('item-location')}>
            <Image
              src={ICON.location_map_list}
              alt="icon"
              width={17}
              height={17}
            />
            <p>{selectedEvent?.eventAddr}</p>
          </div>
        </div>
        <div className={cx('item-bottom')}>
          <p className={cx('item-period')}>
            {formatRange(
              selectedEvent?.operStatDt ?? '',
              selectedEvent?.operEndDt ?? '',
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export { MapSelectBottomSheet }
