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

// Import Swiper styles
import 'swiper/css'

import Skeleton from 'react-loading-skeleton'

import Link from 'next/link'
import { getEventDetailUrl } from '@/app/_utils/navigation'
import { useMemo } from 'react'

const cx = classNames.bind(styles)

interface TopBannerProps {
  eventCode: TEventCodeName
}

const TopBanner = (props: TopBannerProps) => {
  const { eventCode } = props

  const currentEventCode = ALL_EVENT_CODE_MAP[eventCode]

  const { data, isLoading } = useQuery({
    queryKey: ['banner-event'],
    queryFn: () => getBannerEvent(currentEventCode),
  })

  return (
    <div className={cx('container')}>
      {isLoading ? (
        <Skeleton width={382} height={429} borderRadius={10} />
      ) : (
        <Swiper className={cx('slide')}>
          {data.map((item: IListItem) => {
            return (
              <SwiperSlide className={cx('slide-item')} key={item.eventId}>
                <Link href={getEventDetailUrl(item.eventTypeCd, item.eventId)}>
                  <Image
                    className={cx('banner-img')}
                    src={item.imageUrl ?? SampleImg}
                    alt="top-banner"
                    width={382}
                    height={429}
                  />
                </Link>
              </SwiperSlide>
            )
          })}
        </Swiper>
      )}

      <Chip className={cx('banner-chip')} eventCode={eventCode}>
        자세히 보기
      </Chip>
    </div>
  )
}

export default TopBanner
