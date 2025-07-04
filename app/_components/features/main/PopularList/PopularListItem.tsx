import styles from './PopularListItem.module.scss'
import classNames from 'classnames/bind'

import { IListItem } from '../type'
import Image from 'next/image'
import SampleImage from '@/public/free-img.jpg'
import { formatDateRange } from '@/app/_utils/textFormatter'
import { useMemo } from 'react'
import { getEventDetailUrl } from '@/app/_utils/navigation'
import Link from 'next/link'

const cx = classNames.bind(styles)

interface PopularListItemProps {
  data: IListItem
  idx: number
}

const PopularListItem = (props: PopularListItemProps) => {
  const { data, idx } = props

  const date = useMemo(
    () => formatDateRange(data.operStatDt, data.operEndDt),
    [data],
  )

  const detailUrl = useMemo(() => {
    return getEventDetailUrl(data.eventTypeCd, data.eventId)
  }, [data])

  return (
    <Link href={detailUrl}>
      <div className={cx('list-item')}>
        <Image
          className={cx('image')}
          src={data.imageUrl || SampleImage}
          alt="image"
          width={200}
          height={200}
        />
        <div className={cx('info-section')}>
          <div className={cx('rank')}>{idx + 1}</div>

          <div className={cx('info')}>
            <div className={cx('title')}>{data.eventNm}</div>
            <div className={cx('event-date')}>{date}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PopularListItem
