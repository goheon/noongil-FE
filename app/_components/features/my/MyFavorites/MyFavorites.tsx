'use client'

import styles from './MyFavorites.module.scss'
import classNames from 'classnames/bind'
import useMyFavorites from '../useMyFavorites'
import SkeletonList from '@/app/_components/common/skeleton-list/SkeletonList'
import SearchListItem from '../../searchList/SearchList/SearchListItem'

const cx = classNames.bind(styles)

const MyFavorites = () => {
  const { data, isLoading } = useMyFavorites()

  console.log('d :', data)

  return (
    <div className={cx('container')}>
      {isLoading ? (
        <SkeletonList listType="board" cardType="column" length={6} />
      ) : (
        <>
          {data && data.length > 0 ? (
            <ul className={cx('list')}>
              {data.map((value) => (
                <li key={value.eventId}>
                  <SearchListItem data={value} eventCode="all" />
                </li>
              ))}
            </ul>
          ) : (
            <div className={cx('empty')}>즐겨찾기 이벤트가 없습니다.</div>
          )}
        </>
      )}
    </div>
  )
}

export default MyFavorites
