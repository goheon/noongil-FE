import styles from './RecommendListView.module.scss'
import classNames from 'classnames/bind'
import { useMemo, useState, useRef, useEffect } from 'react'
import { IUserRecommendListResponse } from '../type'
import { TEventCategory } from '@/app/_types'
import { Chip } from '@/app/_components/ui'
import { ALL_CATEGORY_LABELS } from '@/app/_constants/event'
import { TEventCodeName } from '@/app/_types'
import Image from 'next/image'
import SampleImage from '@/public/free-img.jpg'
import { formatDateRange } from '@/app/_utils/textFormatter'
import { getEventDetailUrl } from '@/app/_utils/navigation'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Link from 'next/link'

const cx = classNames.bind(styles)

interface RecommendListViewProps {
  data: IUserRecommendListResponse
  eventCode: TEventCodeName
}

type TabType = 'ALL' | TEventCategory

const RecommendListView = (props: RecommendListViewProps) => {
  const { data, eventCode } = props

  const [currentTab, setCurrentTab] = useState<TabType>('ALL')

  const tabs = useMemo<TabType[]>(() => {
    return ['ALL', ...(Object.keys(data.categories) as TEventCategory[])]
  }, [data])

  const currentList = useMemo(() => {
    return currentTab === 'ALL' ? data.all : data.categories[currentTab]
  }, [currentTab, data])

  const swiperRef = useRef<SwiperCore | null>(null)

  const handleTabChange = (newTab: TabType) => {
    setCurrentTab(newTab)
  }

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0)
    }
  }, [currentTab])

  return (
    <div className={cx('container')}>
      <Swiper slidesPerView="auto" spaceBetween={20} className={cx('tab-list')}>
        {tabs.map((tab) => (
          <SwiperSlide key={tab} style={{ width: 'auto' }}>
            <Chip
              className={cx('tab', {
                'tab--selected': currentTab === tab,
              })}
              onClick={() => handleTabChange(tab)}
            >
              {tab === 'ALL' ? '전체' : ALL_CATEGORY_LABELS[tab]}
            </Chip>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        className={cx('item-list')}
        slidesPerView={'auto'}
        modules={[Pagination]}
        spaceBetween={20}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
      >
        {currentList.map((item, idx) => (
          <SwiperSlide className={cx('list-item-wrapper')} key={item.eventId}>
            <Link href={getEventDetailUrl(item.eventTypeCd, item.eventId)}>
              <div className={cx('list-item')}>
                <div className={cx('img-wrapper')}>
                  <Image
                    className={cx('image')}
                    src={item.imageUrl ?? SampleImage}
                    alt="img"
                    fill
                  />
                </div>

                <div className={cx('info-box')}>
                  <div className={cx('info')}>
                    <div
                      className={cx('title', {
                        'title--exhibition': eventCode === 'exhibition',
                      })}
                    >
                      {item.eventNm}
                    </div>
                    <div className={cx('event-date')}>
                      {formatDateRange(item.operStatDt, item.operEndDt)}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default RecommendListView
