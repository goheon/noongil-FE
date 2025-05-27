'use client'

import styles from './SearchList.module.scss'
import classNames from 'classnames/bind'
import useSearchList from '../useSearchList'
import SearchListItem from './SearchListItem'
import SearchListHeader from '../SearchListHeader/SearchListHeader'
import { ALL_EVENT_CODE_MAP } from '@/app/_constants/event'
import { TEventCodeName } from '@/app/_types'
import useSyncStoreWithURL from '../useSyncStoreWithURL'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import SkeletonList from '@/app/_components/common/skeleton-list/SkeletonList'

const cx = classNames.bind(styles)

interface SearchListProps {
  eventCode: TEventCodeName
}

const SearchList = (props: SearchListProps) => {
  const { eventCode } = props
  const currentEventCode = ALL_EVENT_CODE_MAP[eventCode]

  useSyncStoreWithURL()

  const { list, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSearchList(currentEventCode)

  const { ref, inView } = useInView({
    threshold: 1,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

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
        <SkeletonList listType="board" cardType="column" length={6} />
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

          <div ref={ref} />
        </ul>
      )}

      {isFetchingNextPage && (
        <SkeletonList listType="board" cardType="column" length={6} />
      )}
    </div>
  )
}

export default SearchList
