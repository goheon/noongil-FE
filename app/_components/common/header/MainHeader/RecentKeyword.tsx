import styles from './RecentKeyword.module.scss'
import classNames from 'classnames/bind'
import { Chip } from '@/app/_components/ui'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const cx = classNames.bind(styles)

const KEYWORD_EXAMPLES = [
  '더현대',
  '뉴진스',
  '성수',
  '데이식스',
  '픽사',
  '짱구',
  '크리스마스',
] as const

interface RecentKeywordProps {
  isExhibition: boolean
}

const RecentKeyword = (props: RecentKeywordProps) => {
  const { isExhibition } = props

  return (
    <div className={cx('container')}>
      <div className={cx('title')}>최근 검색어</div>

      <Swiper
        slidesPerView="auto"
        modules={[Pagination]}
        className={cx('list')}
      >
        {KEYWORD_EXAMPLES.map((el) => (
          <SwiperSlide key={el} className={cx('list-item')}>
            <Chip
              suffixIcon="close"
              iconSize={16}
              category={isExhibition ? 'exhibition' : 'popup'}
            >
              {el}
            </Chip>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default RecentKeyword
