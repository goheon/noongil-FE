import styles from './SearchListHeader.module.scss'
import classNames from 'classnames/bind'
import { Chip } from '@/app/_components/ui'

const cx = classNames.bind(styles)

interface SearchListHeaderProps {
  category?: string
}

const SearchListHeader = (props: SearchListHeaderProps) => {
  const { category = 'popup' } = props

  return (
    <div className={cx('searchList-header')}>
      <Chip
        className={cx('filter-chip')}
        suffixIcon="chevron"
        category={category}
      >
        인기순
      </Chip>
      <Chip
        className={cx('filter-chip')}
        suffixIcon="chevron"
        category={category}
      >
        카테고리
      </Chip>
      <Chip
        className={cx('filter-chip')}
        suffixIcon="chevron"
        category={category}
      >
        날짜
      </Chip>
      <Chip
        className={cx('filter-chip')}
        suffixIcon="chevron"
        category={category}
      >
        지역
      </Chip>
    </div>
  )
}

export default SearchListHeader
