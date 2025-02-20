'use client'

import styles from './TopBanner.module.scss'
import classNames from 'classnames/bind'
import Image from 'next/image'
import SampleImg from '@/public/free-img.jpg'
import { Chip } from '@/app/_components/ui'
import { useQuery } from '@tanstack/react-query'
import { getBannerEvent } from '../mainApi'
import { IListItem } from '../type'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'

const cx = classNames.bind(styles)

const TopBanner = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['banner-event'],
    queryFn: getBannerEvent,
  })

  return (
    <div className={cx('container')}>
      {isLoading ? (
        <div>불러오는 중입니다.</div>
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

      <Chip className={cx('banner-chip')}>자세히 보기</Chip>
    </div>
  )
}

export default TopBanner
