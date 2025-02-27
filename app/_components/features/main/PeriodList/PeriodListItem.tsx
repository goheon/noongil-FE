import styles from './PeriodListItem.module.scss'
import classNames from 'classnames/bind'
import Image from 'next/image'
import { Chip } from '@/app/_components/ui'
import { IListItem } from '../type'
import SampleImage from '@/public/free-img.jpg'
import { formatDateRange } from '@/app/_utils/textFormatter'
import { useMemo } from 'react'

const cx = classNames.bind(styles)

interface PeriodListItemProps {
  data: IListItem
  periodType: 'open' | 'close'
}

const PeriodListItem = (props: PeriodListItemProps) => {
  const { data, periodType } = props

  const eventDate = useMemo(
    () => formatDateRange(data.operStatDt, data.operEndDt),
    [data],
  )

  const eventDday = useMemo(
    () => (data.dday === 'D-0' ? 'D-day' : data.dday),
    [data],
  )

  return (
    <div className={cx('list-item')}>
      <div className={cx('img-wrapper')}>
        <Image
          src={data.imageUrl ?? SampleImage}
          alt="image"
          width={125}
          height={125}
          className={cx('image')}
        />
      </div>

      <div className={cx('info-section')}>
        <Chip
          className={cx('day-chip', {
            'day-chip--close': periodType === 'close',
          })}
        >
          {eventDday}
        </Chip>
        <div className={cx('event-title')}>{data.eventNm}</div>
        <div className={cx('event-date')}>{eventDate}</div>
      </div>
    </div>
  )
}

export default PeriodListItem
