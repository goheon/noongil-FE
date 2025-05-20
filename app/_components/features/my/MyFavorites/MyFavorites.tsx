'use client'

import styles from './MyFavorites.module.scss'
import classNames from 'classnames/bind'
import useMyFavorites from '../useMyFavorites'
import FavoriteItem from './FavoriteItem'

const cx = classNames.bind(styles)

const MyFavorites = () => {
  const { data, isLoading } = useMyFavorites()

  return (
    <div className={cx('container')}>
      {isLoading ? (
        <div>데이터를 가져오고 있습니다.</div>
      ) : (
        <>
          {data ? (
            <ul className={cx('list')}>
              {data.map((value) => (
                <li key={value.eventId}>
                  <FavoriteItem data={value} />
                </li>
              ))}
            </ul>
          ) : (
            <div>즐겨찾기 이벤트가 없습니다.</div>
          )}
        </>
      )}
    </div>
  )
}

export default MyFavorites
