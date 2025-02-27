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

import Skeleton from 'react-loading-skeleton'

import { EVENT_CATEGORY_MAP } from '../type'
import PeriodListItem from './PeriodListItem'
import SkeletonList from './SkeletonList'

const cx = classNames.bind(styles)

const TITLE_MAP = {
  open: {
    popup: '오픈 예정 팝업',
    exhibition: '오픈 예정 전시',
    all: '오픈 예정 컨텐츠',
  },
  close: {
    popup: '마감 임박! 팝업',
    exhibition: '마감 임박! 전시',
    all: '마감 임박! 컨텐츠',
  },
} as const

// TODO: 오픈, 마감 예정과 관련한 API 완성시 수정

interface PeriodListProps {
  category: 'popup' | 'exhibition' | 'all'
  periodType: 'open' | 'close'
}

const PeriodList = (props: PeriodListProps) => {
  const { category, periodType } = props

  const currentCategory = EVENT_CATEGORY_MAP[category]

  const { isOpenListLoading, openList, isCloseListLoading, closeList } =
    usePeriodList(currentCategory)

  const listTitle = useMemo(() => {
    return TITLE_MAP[periodType][category]
  }, [periodType, category])

  const isLoading = useMemo(
    () => (periodType === 'open' ? isOpenListLoading : isCloseListLoading),
    [category, isOpenListLoading, isCloseListLoading],
  )

  const listData = useMemo(
    () => (periodType === 'open' ? openList : closeList),
    [category, openList, closeList],
  )

  return (
    <div className={cx('container')}>
      <div className={cx('title')}>{listTitle}</div>

      {isLoading && <SkeletonList />}

      {!isLoading && listData.length > 0 && (
        <Swiper
          slidesPerView="auto"
          modules={[Pagination]}
          className={cx('list')}
        >
          {listData.map((data: IListItem) => (
            <SwiperSlide key={data.eventId} className={cx('list-item-wrapper')}>
              <PeriodListItem data={data} periodType={periodType} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {!isLoading && listData.length === 0 && (
        <div className={cx('notice')}>컨텐츠가 없습니다.</div>
      )}
    </div>
  )
}

export default PeriodList
