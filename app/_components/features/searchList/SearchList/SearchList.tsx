'use client'

import styles from './SearchList.module.scss'
import classNames from 'classnames/bind'
import useSearchList from '../useSearchList'
import SearchListItem from './SearchListItem'
import SearchListHeader from '../SearchListHeader/SearchListHeader'
import { ALL_EVENT_CODE_MAP } from '@/app/_constants/event'
import { TEventCodeName } from '@/app/_types'
import Skeleton from 'react-loading-skeleton'
import useSyncStoreWithURL from '../useSyncStoreWithURL'

const cx = classNames.bind(styles)

const skeletonListArr = Array.from({ length: 6 })

interface SearchListProps {
  eventCode: TEventCodeName
}

const SearchList = (props: SearchListProps) => {
  const { eventCode } = props
  const currentEventCode = ALL_EVENT_CODE_MAP[eventCode]

  useSyncStoreWithURL()

  const { list, isFetching, isFetchingNextPage } =
    useSearchList(currentEventCode)

  return (
    <div className={cx('container')}>
      <div
        className={cx('header', {
          'header--exhibition': eventCode === 'exhibition',
        })}
      >
        <SearchListHeader eventCode={eventCode} />
      </div>

      {isFetching ? (
        <ul className={cx('list')}>
          {skeletonListArr.map((_, idx) => (
            <li key={idx} className={cx('skeleton-wrapper')}>
              <Skeleton width={215} height={235} />

              <Skeleton width={215} />
              <Skeleton width={215} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className={cx('list')}>
          {list && list.length > 0 ? (
            list.map((data) => (
              <li key={data.eventId}>
                <SearchListItem data={data} eventCode={eventCode} />
              </li>
            ))
          ) : (
            <div>빈페이지입니다.</div>
          )}
        </ul>
      )}

      {isFetchingNextPage && (
        <ul className={cx('list')}>
          {skeletonListArr.map((_, idx) => (
            <li key={idx} className={cx('skeleton-wrapper')}>
              <Skeleton width={215} height={235} />

              <Skeleton width={215} />
              <Skeleton width={215} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchList
