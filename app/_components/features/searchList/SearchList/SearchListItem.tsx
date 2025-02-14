import styles from './SearchListItem.module.scss'
import classNames from 'classnames/bind'
import { ISearchListItem } from '../type'
import Image from 'next/image'
import ExampleImg from '@/public/free-img.jpg'
import { ICON } from '@/public'
import { useMemo } from 'react'

interface SearchListItemProps {
  data: ISearchListItem
  category: string
}

const cx = classNames.bind(styles)

// TODO: image, icon 교체하기

const SearchListItem = (props: SearchListItemProps) => {
  const { data, category } = props

  const {
    eventId,
    eventNm,
    operStatDt,
    operEndDt,
    likeYn,
    smallImageUrl,
    eventAddr,
  } = data

  const extractCityDistrict = (address: string) => {
    const match = address.match(/^[^\s]+ \S+구/)
    return match ? match[0] : address
  }

  const eventAddress = useMemo(
    () => extractCityDistrict(eventAddr),
    [eventAddr],
  )

  const formatDateRange = (start: string, end: string) => {
    const format = (date: string) =>
      `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}`

    return `${format(start)} ~ ${format(end)}`
  }

  const eventPeriod = useMemo(
    () => formatDateRange(operStatDt, operEndDt),
    [operStatDt, operEndDt],
  )

  const heartIcon = useMemo(
    () => (category === 'popup' ? ICON.heart_popup : ICON.heart_exhibition),
    [category],
  )

  return (
    <div className={cx('container')}>
      <Image src={ExampleImg} width={215} height={235} alt="image" />
      <div className={cx('info-section')}>
        <div className={cx('top')}>
          <div className={cx('title')}>{eventNm}</div>
          <Image src={heartIcon} alt="icon" width={20} height={20} />
        </div>

        <div className={cx('address')}>{eventAddress}</div>
        <div className={cx('period')}>{eventPeriod}</div>
      </div>
    </div>
  )
}

export default SearchListItem
