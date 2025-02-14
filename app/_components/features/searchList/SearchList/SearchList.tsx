import styles from './SearchList.module.scss'
import classNames from 'classnames/bind'
import useSearchList from './useSearchList'
import SearchListItem from './SearchListItem'
import SearchListHeader from '../SearchListHeader/SearchListHeader'

const cx = classNames.bind(styles)

interface SearchListProps {
  category: string
}

const SearchList = (props: SearchListProps) => {
  const { category } = props

  const { list } = useSearchList()

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
