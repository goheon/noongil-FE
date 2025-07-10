'use client'

import styles from './RecentKeyword.module.scss'
import classNames from 'classnames/bind'
import { Chip } from '@/app/_components/ui'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import useApplySearchParams from '@/app/_components/features/searchList/useApplySearchParams'
import { useKeywordHistoryStore } from '@/app/_store/keywordHistory/useKeywordHistory'
import { useListFilterStore } from '@/app/_store/listFilter/useListFilterStore'

const cx = classNames.bind(styles)

interface RecentKeywordProps {
  isExhibition: boolean
  closeSearchBox: () => void
}

const RecentKeyword = (props: RecentKeywordProps) => {
  const { isExhibition, closeSearchBox } = props

  const { applyParams } = useApplySearchParams()
  const { histories, removeHistory } = useKeywordHistoryStore()
  const { setKeyword } = useListFilterStore()

  const handleClick = (keyword: string) => {
    setTimeout(() => {
      setKeyword(keyword)
      applyParams({
        keyword,
      })
    }, 0)

    closeSearchBox()
  }

  return (
    <div className={cx('container')}>
      <div className={cx('title')}>최근 검색어</div>

      {histories.length > 0 ? (
        <Swiper
          slidesPerView="auto"
          modules={[Pagination]}
          className={cx('list')}
        >
          {histories.map((el) => (
            <SwiperSlide key={el} className={cx('list-item')}>
              <Chip
                className={cx('chip')}
                onClick={() => handleClick(el)}
                suffixIcon="close"
                iconSize={16}
                eventCode={isExhibition ? 'exhibition' : 'popup'}
                handleIconClick={() => removeHistory(el)}
              >
                {el}
              </Chip>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={cx('notice')}>최근 검색어가 없습니다.</div>
      )}
    </div>
  )
}

export default RecentKeyword
