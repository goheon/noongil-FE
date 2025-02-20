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
import Image from 'next/image'
import SampleImage from '@/public/free-img.jpg'
import { useMemo } from 'react'
import { formatDateRange } from '@/app/_utils/textFormatter'
import Skeleton from 'react-loading-skeleton'
import { EVENT_CATEGORY_MAP } from '../type'

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
  type: 'popup' | 'exhibition' | 'all'
}

const PopularList = (props: PopularListProps) => {
  const { type } = props

  const category = EVENT_CATEGORY_MAP[type]
  const { popularList, isLoading } = usePopularList(category)

  const listTitle = useMemo(() => TITLE_MAP[type] ?? ALL_TITLE, [type])

  return (
    <div className={cx('container')}>
      <div className={cx('top-section')}>
        <div className={cx('title')}>{listTitle}</div>
        <div className={cx('more')}>더보기</div>
      </div>

      {isLoading ? (
        <div className={cx('skeleton-box')}>
          <div className={cx('skeleton-wrapper')}>
            <Skeleton width={200} height={200} borderRadius={5} />
            <Skeleton width={200} />
            <Skeleton width={200} />
          </div>

          <div className={cx('skeleton-wrapper')}>
            <Skeleton width={200} height={200} borderRadius={5} />
            <Skeleton width={200} />
            <Skeleton width={200} />
          </div>
        </div>
      ) : (
        <Swiper
          slidesPerView={'auto'}
          modules={[Pagination]}
          className={cx('swiper')}
        >
          {popularList.length > 0 &&
            popularList.map((data: IListItem, idx: number) => (
              <SwiperSlide key={data.eventId} className={cx('list-item')}>
                <Image
                  className={cx('image')}
                  src={data.imageUrl || SampleImage}
                  alt="image"
                  width={200}
                  height={200}
                />
                <div className={cx('info-section')}>
                  <div className={cx('rank')}>{idx + 1}</div>

                  <div className={cx('info')}>
                    <div className={cx('title')}>{data.eventNm}</div>
                    <div className={cx('event-date')}>
                      {formatDateRange(data.operStatDt, data.operEndDt)}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  )
}

export default PopularList
