import styles from './SearchListItem.module.scss'
import classNames from 'classnames/bind'
import { ISearchListItem } from '../type'
import Image from 'next/image'
import ExampleImg from '@/public/free-img.jpg'
import { ICON } from '@/public'
import { useMemo } from 'react'
import {
  extractCityDistrict,
  formatDateRange,
} from '@/app/_utils/textFormatter'
import useBookmarkItem from './useBookmarkItem'
import { TEventCodeName } from '@/app/_types'

const heartIconMap = {
  exhibition: {
    liked: ICON.heart_black,
    unliked: ICON.heart_white,
  },
  popup: {
    liked: ICON.heart_black_active,
    unliked: ICON.heart_black,
  },
  all: {
    liked: ICON.heart_black_active,
    unliked: ICON.heart_black,
  },
}

interface SearchListItemProps {
  data: ISearchListItem
  eventCode: TEventCodeName
}

const cx = classNames.bind(styles)

const SearchListItem = (props: SearchListItemProps) => {
  const { data, eventCode } = props

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
    const state = likeYn === 'Y' ? 'liked' : 'unliked'

    return heartIconMap[eventCode][state]
  }, [eventCode, likeYn])

  const handleClick = () => {
    onBookmark({
      eventId,
      likeYn: likeYn === 'Y' ? 'N' : 'Y',
    })
  }

  return (
    <div className={cx('container')}>
      <Image
        src={imageUrl ?? ExampleImg}
        width={215}
        height={235}
        alt="image"
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
      </div>
    </div>
  )
}

export default SearchListItem
