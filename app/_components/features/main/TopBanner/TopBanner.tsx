'use client'

import styles from './TopBanner.module.scss'
import classNames from 'classnames/bind'
import Image from 'next/image'
import SampleImg from '@/public/free-img.jpg'
import { Chip } from '@/app/_components/ui'
import { useQuery } from '@tanstack/react-query'
import { getBannerEvent } from '../mainApi'
import { IListItem } from '../type'
import { ALL_EVENT_CODE_MAP } from '@/app/_constants/event'
import { TEventCodeName } from '@/app/_types'

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'

import Skeleton from 'react-loading-skeleton'

import Link from 'next/link'
import { getEventDetailUrl } from '@/app/_utils/navigation'
import { formatDateRange } from '@/app/_utils/textFormatter'
import { useMemo, useState } from 'react'

const cx = classNames.bind(styles)

interface TopBannerProps {
  eventCode: TEventCodeName
}

const TopBanner = (props: TopBannerProps) => {
  const { eventCode } = props

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const currentEventCode = ALL_EVENT_CODE_MAP[eventCode]

  const { data, isLoading } = useQuery({
    queryKey: ['banner-event'],
    queryFn: () => getBannerEvent(currentEventCode),
  })

  const currentSlideUrl = useMemo(() => {
    if (
      !Array.isArray(data) ||
      currentSlideIndex < 0 ||
      currentSlideIndex >= data.length
    ) {
      return ''
    }

    const current = data[currentSlideIndex]
    return getEventDetailUrl(current.eventTypeCd, current.eventId)
  }, [data, currentSlideIndex])

  return (
    <div className={cx('container')}>
      {isLoading ? (
        <Skeleton width={382} height={429} borderRadius={10} />
      ) : (
        <Swiper
          className={cx('slide')}
          onSlideChange={(swiper) => setCurrentSlideIndex(swiper.realIndex)}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 20, // 슬라이드 간 간격 겹치게
            depth: 150, // Z축 깊이 증가 (멀리 보임)
            modifier: 1.4, // 효과 강도 증가
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow]}
        >
          {data.map((item: IListItem) => {
            return (
              <SwiperSlide className={cx('slide-item')} key={item.eventId}>
                <Link
                  className={cx('link')}
                  href={getEventDetailUrl(item.eventTypeCd, item.eventId)}
                >
                  <div className={cx('item-wrapper')}>
                    <div className={cx('img-wrapper')}>
                      <Image
                        className={cx('banner-img')}
                        src={item.imageUrl ?? SampleImg}
                        alt="top-banner"
                        fill
                      />
                    </div>

                    <div className={cx('notice-box')}>
                      <div className={cx('title')}>{item.eventNm}</div>
                      <div className={cx('infos')}>
                        <div className={cx('info')}>
                          {formatDateRange(item.operStatDt, item.operEndDt)}
                        </div>
                        <div className={cx('info')}>{item.lnad}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            )
          })}
        </Swiper>
      )}

      <Link href={currentSlideUrl}>
        <Chip className={cx('banner-chip')} eventCode={eventCode}>
          자세히 보기
        </Chip>
      </Link>
    </div>
  )
}

export default TopBanner
