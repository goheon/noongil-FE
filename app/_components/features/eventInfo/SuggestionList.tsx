import styles from './SuggestionList.module.scss'
import classNames from 'classnames/bind'
import { IListItem } from '../main/type'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper/modules'
import Image from 'next/image'
import SampleImage from '@/public/free-img.jpg'
import { formatDateRange } from '@/app/_utils/textFormatter'

const cx = classNames.bind(styles)

interface SuggestionListProps {
  list: IListItem[]
  rank?: boolean
  title: string
}

const SuggestionList = (props: SuggestionListProps) => {
  const { list, rank = false, title } = props

  return (
    <div className={cx('container')}>
      <div className={cx('title')}>{title}</div>

      <Swiper
        className={cx('list')}
        slidesPerView={'auto'}
        modules={[Pagination]}
      >
        {list &&
          list.map((item, idx) => (
            <SwiperSlide className={cx('list-item-wrapper')} key={item.eventId}>
              <div className={cx('list-item')}>
                <Image
                  className={cx('image')}
                  src={item.imageUrl || item.smallImageUrl || SampleImage}
                  width={160}
                  height={180}
                  alt="img"
                />
                <div className={cx('info-box')}>
                  {rank && (
                    <div
                      className={cx('rank', {
                        'rank--exhibition': item.eventTypeCd === '20',
                      })}
                    >
                      {idx + 1}
                    </div>
                  )}

                  <div className={cx('info')}>
                    <div
                      className={cx('title', {
                        'title--exhibition': item.eventTypeCd === '20',
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
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default SuggestionList
