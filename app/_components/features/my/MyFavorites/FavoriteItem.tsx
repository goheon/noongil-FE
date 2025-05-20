import styles from './FavoriteItem.module.scss'
import classNames from 'classnames/bind'
import { ISearchListItem } from '../../searchList/type'
import Image from 'next/image'
import ExampleImg from '@/public/free-img.jpg'
import { ICON } from '@/public'
import { useCallback, useMemo } from 'react'
import {
  extractCityDistrict,
  formatDateRange,
} from '@/app/_utils/textFormatter'
import useBookmarkItem from '../../searchList/SearchList/useBookmarkItem'
import { isBefore, parse } from 'date-fns'

interface FavoriteItemProps {
  data: ISearchListItem
}

const cx = classNames.bind(styles)

// TODO: 공통 컴폰너트 정리하기
const FavoriteItem = (props: FavoriteItemProps) => {
  const { data } = props

  const {
    eventId,
    eventNm,
    operStatDt,
    operEndDt,
    likeYn,
    smallImageUrl,
    eventAddr,
    imageUrl,
  } = data

  const { onBookmark } = useBookmarkItem()

  const eventAddress = useMemo(
    () => extractCityDistrict(eventAddr),
    [eventAddr],
  )

  const eventPeriod = useMemo(
    () => formatDateRange(operStatDt, operEndDt),
    [operStatDt, operEndDt],
  )

  const heartIcon = useMemo(() => {
    return likeYn === 'Y' ? ICON.heart_black_active : ICON.heart_black
  }, [likeYn])

  const handleClick = () => {
    onBookmark({
      eventId,
      likeYn: likeYn === 'Y' ? 'N' : 'Y',
    })
  }

  const isPastDate = useCallback((dateString: string) => {
    const year = `20${dateString.slice(0, 2)}`
    const month = dateString.slice(2, 4)
    const day = dateString.slice(4, 6)

    // 'YYMMDD' 형식에서 'YYYY-MM-DD' 형식으로 변환
    const date = parse(`${year}-${month}-${day}`, 'yyyy-MM-dd', new Date())

    // 오늘 날짜와 비교
    const today = new Date()
    today.setHours(0, 0, 0, 0) // 오늘 자정으로 시간 초기화

    return isBefore(date, today) // date가 today보다 이전인지 확인
  }, [])

  const isPast = useMemo(() => {
    return isPastDate(operEndDt)
  }, [operEndDt])

  return (
    <div className={cx('container')}>
      <Image
        src={imageUrl ?? ExampleImg}
        width={215}
        height={235}
        alt="image"
        className={cx('event-image', {
          'event-image--past': isPast,
        })}
      />
      <div className={cx('info-section')}>
        <div className={cx('top')}>
          <div className={cx('title')}>{eventNm}</div>
          <div className={cx('icon-wrapper')} onClick={handleClick}>
            <Image
              className={cx('icon')}
              src={heartIcon}
              alt="icon"
              width={20}
              height={20}
            />
          </div>
        </div>

        <div className={cx('address')}>{eventAddress}</div>
        <div className={cx('period')}>{eventPeriod}</div>

        {isPast && <div className={cx('past-notice')}>마감</div>}
      </div>
    </div>
  )
}

export default FavoriteItem
