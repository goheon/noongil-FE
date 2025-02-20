'use client'

import { useMemo } from 'react'
import styles from './PeriodList.module.scss'
import classNames from 'classnames/bind'
import usePeriodList from './usePeriodList'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper/modules'
import { IListItem } from '../type'

import SampleImage from '@/public/free-img.jpg'
import Image from 'next/image'
import { Chip } from '@/app/_components/ui'

import { formatDateRange } from '@/app/_utils/textFormatter'
import Skeleton from 'react-loading-skeleton'

const cx = classNames.bind(styles)

// TODO: 오픈, 마감 예정과 관련한 API 완성시 수정

interface PeriodListProps {
  type: 'open' | 'close'
}

const OPEN_TITLE = '오픈 예정 팝업'
const CLOSE_TITLE = '마감 임박! 팝업'

const PeriodList = (props: PeriodListProps) => {
  const { type } = props

  const { isOpenListLoading, openList, isCloseListLoading, closeList } =
    usePeriodList()

  const listTitle = useMemo(
    () => (type === 'open' ? OPEN_TITLE : CLOSE_TITLE),
    [type],
  )

  const isLoading = useMemo(
    () => (type === 'open' ? isOpenListLoading : isCloseListLoading),
    [type, isOpenListLoading, isCloseListLoading],
  )

  const listData = useMemo(
    () => (type === 'open' ? openList : closeList),
    [type, openList, closeList],
  )

  return (
    <div className={cx('container')}>
      <div className={cx('title')}>{listTitle}</div>

      {isLoading ? (
        <div className={cx('skeleton-wrapper')}>
          <Skeleton width={125} height={125} />
          <div className={cx('skeleton-infos')}>
            <Skeleton width={100} />
            <Skeleton width={100} />
          </div>
        </div>
      ) : (
        <Swiper
          slidesPerView={'auto'}
          modules={[Pagination]}
          className={cx('swiper')}
        >
          {listData.length > 0 &&
            listData.map((data: IListItem) => (
              <SwiperSlide key={data.eventId} className={cx('list-item')}>
                <div className={cx('img-wrapper')}>
                  <Image
                    src={data.imageUrl ?? SampleImage}
                    alt="image"
                    width={125}
                    height={125}
                    className={cx('image')}
                  />
                </div>

                <div className={cx('info-section')}>
                  <Chip
                    className={cx('day-chip', {
                      'day-chip--close': type === 'close',
                    })}
                  >
                    D-1
                  </Chip>
                  <div className={cx('event-title')}>{data.eventNm}</div>
                  <div className={cx('event-date')}>
                    {formatDateRange(data.operStatDt, data.operEndDt)}
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  )
}

export default PeriodList
