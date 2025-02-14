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
import { extractCityDistrict } from '@/app/_utils/textFormatter'
import { useMemo } from 'react'

const cx = classNames.bind(styles)

interface PopularListProps {
  type: 'popup' | 'exhibition'
}

const POPUP_TITLE = '오늘의 인기 팝업'
const EXHIBITION_TITLE = '오늘의 인기 전시'

const PopularList = (props: PopularListProps) => {
  const { type } = props

  const { isExhibitionLoading, isPopupLoading, popupData, exhibitionData } =
    usePopularList()

  const listTitle = useMemo(
    () => (type === 'popup' ? POPUP_TITLE : EXHIBITION_TITLE),
    [type],
  )

  const isLoading = useMemo(
    () => (type === 'popup' ? isPopupLoading : isExhibitionLoading),
    [type, isPopupLoading, isExhibitionLoading],
  )

  const listData = useMemo(
    () => (type === 'popup' ? popupData : exhibitionData),
    [type, popupData, exhibitionData],
  )

  return (
    <div className={cx('container')}>
      <div className={cx('top-section')}>
        <div className={cx('title')}>{listTitle}</div>
        <div className={cx('more')}>더보기</div>
      </div>

      {isLoading ? (
        <div>리스트를 불러오고 있습니다.</div>
      ) : (
        <Swiper
          slidesPerView={'auto'}
          modules={[Pagination]}
          className={cx('swiper')}
        >
          {listData.map((data: IListItem) => (
            <SwiperSlide key={data.eventId} className={cx('list-item')}>
              <Image
                className={cx('image')}
                src={SampleImage}
                alt="image"
                width={200}
                height={200}
              />
              <div className={cx('info-section')}>
                <div className={cx('title')}>{data.eventNm}</div>
                <div className={cx('address')}>
                  {extractCityDistrict(data.eventAddr)}
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
