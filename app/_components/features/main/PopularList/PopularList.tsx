'use client'

import styles from './PopularList.module.scss'
import classNames from 'classnames/bind'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper/modules'

import usePopularList from './usePopularList'
import { IListItem } from '../type'
import { TEventCodeName } from '@/app/_types'
import { useMemo } from 'react'
import { ALL_EVENT_CODE_MAP } from '@/app/_constants/event'

import PopularListItem from './PopularListItem'
import SkeletonList from '@/app/_components/common/skeleton-list/SkeletonList'

const cx = classNames.bind(styles)

const POPUP_TITLE = '오늘의 인기 팝업'
const EXHIBITION_TITLE = '오늘의 인기 전시'
const ALL_TITLE = '오늘의 인기 컨텐츠'

const TITLE_MAP = {
  popup: POPUP_TITLE,
  exhibition: EXHIBITION_TITLE,
  all: ALL_TITLE,
} as const

interface PopularListProps {
  eventCode: TEventCodeName
}

const PopularList = (props: PopularListProps) => {
  const { eventCode } = props

  const currentEventCode = ALL_EVENT_CODE_MAP[eventCode]
  const { popularList, isLoading } = usePopularList(currentEventCode)

  const listTitle = useMemo(
    () => TITLE_MAP[eventCode] ?? ALL_TITLE,
    [eventCode],
  )

  return (
    <div className={cx('container')}>
      <div className={cx('top-section')}>
        <div className={cx('title')}>{listTitle}</div>
        <div className={cx('more')}>더보기</div>
      </div>

      {isLoading ? (
        <SkeletonList listType="carousel" cardType="column" length={3} />
      ) : (
        <Swiper
          slidesPerView={'auto'}
          modules={[Pagination]}
          className={cx('list')}
        >
          {popularList.length > 0 &&
            popularList.map((data: IListItem, idx: number) => (
              <SwiperSlide
                className={cx('list-item-wrapper')}
                key={data.eventId}
              >
                <PopularListItem data={data} idx={idx} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  )
}

export default PopularList
