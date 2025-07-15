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
        <SkeletonList listType="board" cardType="column" length={8} />
      ) : (
        <>
          {list && list.length > 0 ? (
            <ul className={cx('list')}>
              {list.map((data) => (
                <li key={data.eventId} className={cx('list-item')}>
                  <SearchListItem data={data} eventCode={eventCode} />
                </li>
              ))}
              <div ref={ref} />
            </ul>
          ) : (
            <div className={cx('empty')}>
              <div className={cx('notice-box')}>
                <div className={cx('notice')}>검색 결과가 없습니다.</div>
                <div className={cx('notice')}>검색어를 변경해 보세요.</div>
              </div>
            </div>
          )}
        </>
      )}

      {isFetchingNextPage && (
        <SkeletonList listType="board" cardType="column" length={6} />
      )}
    </div>
  )
}

export default SearchList
