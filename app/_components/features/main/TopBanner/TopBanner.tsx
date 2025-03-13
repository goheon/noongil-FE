'use client'

import styles from './TopBanner.module.scss'
import classNames from 'classnames/bind'
import Image from 'next/image'
import SampleImg from '@/public/free-img.jpg'
import { Chip } from '@/app/_components/ui'
import { useQuery } from '@tanstack/react-query'
import { getBannerEvent } from '../mainApi'
import { IListItem, EVENT_CATEGORY_MAP } from '../type'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'

import Skeleton from 'react-loading-skeleton'

const cx = classNames.bind(styles)

interface TopBannerProps {
  category: 'all' | 'exhibition' | 'popup'
}

const TopBanner = (props: TopBannerProps) => {
  const { category } = props

  const currentCategory = EVENT_CATEGORY_MAP[category]

  const { data, isLoading } = useQuery({
    queryKey: ['banner-event'],
    queryFn: () => getBannerEvent(currentCategory),
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
                <Image
                  className={cx('banner-img')}
                  src={item.imageUrl ?? SampleImg}
                  alt="top-banner"
                  width={382}
                  height={429}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      )}

      <Chip className={cx('banner-chip')} category={category}>
        자세히 보기
      </Chip>
    </div>
  )
}

export default TopBanner
