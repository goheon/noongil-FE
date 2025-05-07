'use client'

import styles from './SearchList.module.scss'
import classNames from 'classnames/bind'
import useSearchList from './useSearchList'
import SearchListItem from './SearchListItem'
import SearchListHeader from '../SearchListHeader/SearchListHeader'
import { EVENT_CATEGORY_MAP } from '../../main/type'
import { useSearchParams } from 'next/navigation'

const cx = classNames.bind(styles)

interface SearchListProps {
  category: 'popup' | 'exhibition' | 'all'
}

const SearchList = (props: SearchListProps) => {
  const { category } = props

  const searchParams = useSearchParams()

  const categories = searchParams.get('categories')?.split(',') ?? []
  const startDate = searchParams.get('startDate') ?? null
  const endDate = searchParams.get('endDate') ?? null

  const currentCategory = EVENT_CATEGORY_MAP[category]

  const { list } = useSearchList(currentCategory)

  return (
    <div className={cx('container')}>
      <div
        className={cx('header', {
          'header--exhibition': category === 'exhibition',
        })}
      >
        <SearchListHeader category={category} />
      </div>

      <ul className={cx('list')}>
        {list ? (
          list.map((data) => (
            <li key={data.eventId}>
              <SearchListItem data={data} category={category} />
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
