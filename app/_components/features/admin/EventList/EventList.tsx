'use client'

import { useCallback, useMemo } from 'react'
import styles from './EventList.module.scss'
import EventListItem from './EventListItem'
import useEventList from './useEventList'
import Link from 'next/link'

const EventList: React.FC = () => {
  const { list, fetchNextPage, hasNextPage, isFetching } = useEventList()

  const getNextPage = useCallback(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetching, fetchNextPage])

  const disabledFetchNextPage = useMemo(
    () => !hasNextPage || isFetching,
    [hasNextPage, isFetching],
  )

  return (
    <div className={`${styles['container']}`}>
      <div className={`${styles['option']}`}>
        <Link href="eventlist/new">
          <button className={`${styles['add-btn']}`}>이벤트 추가</button>
        </Link>
      </div>

      <div className={`${styles['list-header']}`}>
        <div className={`${styles['title']}`}>팝업/전시 구분</div>
        <div className={`${styles['title']}`}>이벤트명</div>
        <div className={`${styles['title']}`}>카테고리명</div>
        <div className={`${styles['title']}`}>이벤트 주소</div>
        <div className={`${styles['title']}`}>이벤트 시작일</div>
        <div className={`${styles['title']}`}>이벤트 종료일</div>
        <div className={`${styles['title']}`}></div>
      </div>

      <ul className={`${styles['list']}`}>
        {list &&
          list.map((item: any) => (
            <li key={item.eventId + Math.random()}>
              <EventListItem item={item} />
            </li>
          ))}
      </ul>

      <button
        className={`${styles['list-footer']}`}
        onClick={getNextPage}
        disabled={disabledFetchNextPage}
      >
        이벤트 더 불러오기
      </button>
    </div>
  )
}

export default EventList
