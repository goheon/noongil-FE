'use client'

import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import Image from 'next/image'

import { BottomSheet } from '@/app/_components/common'

import { useMapQuery } from '../useMapQuery'
import { useMapStore } from '@/app/_store/map/useMapStore'

import { MapEventInfo } from '../MapBox'

import { ICON } from '@/public'
import styles from './MapListBottomSheet.module.scss'

const cx = classNames.bind(styles)

const MapListBottomSheet = () => {
  const [isListSheetOpen, setIsListSheetOpen] = useState(false)
  const [events, setEvents] = useState([])
  const { data } = useMapQuery()

  useEffect(() => {
    if (data) {
      const { events } = data
      if (events) setEvents(events)
    }
  }, [data])

  return (
    <BottomSheet
      type="map-list"
      isOpen={isListSheetOpen}
      setIsOpen={setIsListSheetOpen}
    >
      <div className={cx('list-wrap')}>
        <div className={cx('counts')}>
          <span className={cx('counts-text')}>전체 {events.length}개</span>
        </div>
        <div className={cx('contents')}>
          {(events as MapEventInfo[]).map((event) => (
            <div className={cx('card-wrapper')} key={event.eventId}>
              <ItemCard event={event as MapEventInfo} />
            </div>
          ))}
        </div>
      </div>
    </BottomSheet>
  )
}
interface ItemCardProps {
  event: MapEventInfo
}

const ItemCard: React.FC<ItemCardProps> = ({ event }) => {
  return (
    <div className={cx('item-card')}>
      <div className={cx('image-wrapper')}>
        <Image
          className={cx('item-image')}
          src={event.imageUrl ?? ''}
          alt={event.eventNm}
          fill
        />
      </div>
      <div className={cx('item-info')}>
        <div className={cx('item-top')}>
          <p className={cx('item-title')}>{event.eventNm || ''}</p>
          <div className={cx('item-location')}>
            <Image
              src={ICON.location_map_list}
              alt="icon"
              width={17}
              height={17}
            />
            <p>{event.eventAddr}</p>
          </div>
        </div>
        <div className={cx('item-bottom')}>
          <p className={cx('item-period')}>
            {formatRange(event.operStatDt, event.operEndDt)}
          </p>
        </div>
      </div>
    </div>
  )
}

export const formatRange = (start: string, end: string) => {
  const format = (dateStr: string) => {
    const year = dateStr.slice(0, 4)
    const month = dateStr.slice(4, 6)
    const day = dateStr.slice(6, 8)
    return { year, date: `${month}. ${day}` }
  }

  const startDate = format(start)
  const endDate = format(end)

  if (startDate.year === endDate.year) {
    return `${startDate.year}. ${startDate.date} ~ ${endDate.date}`
  } else {
    return `${startDate.year}. ${startDate.date} ~ ${endDate.year}. ${endDate.date}`
  }
}

export { MapListBottomSheet }
