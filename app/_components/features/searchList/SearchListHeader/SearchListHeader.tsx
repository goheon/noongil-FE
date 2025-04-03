import styles from './SearchListHeader.module.scss'
import classNames from 'classnames/bind'
import { Chip } from '@/app/_components/ui'
import { useListFilterStore } from '@/app/_store/listFilter/useListFilterStore'
import { Filter } from '../type'

const cx = classNames.bind(styles)

const LIST_FILTERS: { label: string; filterKey: Filter | null }[] = [
  { label: '인기순', filterKey: 'order' },
  { label: '카테고리', filterKey: 'category' },
  { label: '날짜', filterKey: 'date' },
  { label: '지역', filterKey: null }, // 지역 필터는 setFilter 호출하지 않음
]

interface SearchListHeaderProps {
  category?: string
}

const SearchListHeader = (props: SearchListHeaderProps) => {
  const { category = 'popup' } = props
  const { setOpen, setFilter } = useListFilterStore()

  return (
    <div className={cx('searchList-header')}>
      {LIST_FILTERS.map(({ label, filterKey }) => (
        <Chip
          key={label}
          className={cx('filter-chip')}
          suffixIcon="chevron"
          category={category}
          onClick={() => {
            if (filterKey) {
              setOpen(true)
              setFilter(filterKey)
            }
          }}
        >
          {label}
        </Chip>
      ))}
    </div>
  )
}

export default SearchListHeader
