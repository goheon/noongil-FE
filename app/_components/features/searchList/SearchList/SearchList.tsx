'use client'

import styles from './SearchList.module.scss'
import classNames from 'classnames/bind'
import useSearchList from './useSearchList'
import SearchListItem from './SearchListItem'
import SearchListHeader from '../SearchListHeader/SearchListHeader'
import { useSearchParams } from 'next/navigation'
import { ALL_EVENT_CODE_MAP } from '@/app/_constants/event'
import { TEventCodeName } from '@/app/_types'

const cx = classNames.bind(styles)

interface SearchListProps {
  eventCode: TEventCodeName
}

const SearchList = (props: SearchListProps) => {
  const { eventCode } = props

  const searchParams = useSearchParams()

  const categories = searchParams.get('categories')?.split(',') ?? []
  const startDate = searchParams.get('startDate') ?? null
  const endDate = searchParams.get('endDate') ?? null

  const currentEventCode = ALL_EVENT_CODE_MAP[eventCode]

  const { list } = useSearchList(currentEventCode)

  return (
    <div className={cx('container')}>
      <div
        className={cx('header', {
          'header--exhibition': eventCode === 'exhibition',
        })}
      >
        <SearchListHeader eventCode={eventCode} />
      </div>

      <ul className={cx('list')}>
        {list ? (
          list.map((data) => (
            <li key={data.eventId}>
              <SearchListItem data={data} eventCode={eventCode} />
            </li>
          ))
        ) : (
          <div>빈페이지입니다.</div>
        )}
      </ul>
    </div>
  )
}

export default SearchList
