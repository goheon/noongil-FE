import styles from './SearchListHeader.module.scss'
import classNames from 'classnames/bind'
import { Chip } from '@/app/_components/ui'
import { useListFilterStore } from '@/app/_store/listFilter/useListFilterStore'
import { TFilter } from '../type'
import { TEventCodeName } from '@/app/_types'

const cx = classNames.bind(styles)

const LIST_FILTERS: { label: string; filterKey: TFilter | null }[] = [
  { label: '인기순', filterKey: 'order' },
  { label: '카테고리', filterKey: 'category' },
  { label: '날짜', filterKey: 'date' },
  { label: '지역', filterKey: 'region' }, // 지역 필터는 setFilter 호출하지 않음
]

interface SearchListHeaderProps {
  eventCode?: TEventCodeName
}

const SearchListHeader = (props: SearchListHeaderProps) => {
  const { eventCode = 'popup' } = props
  const { setOpen, setFilter } = useListFilterStore()

  return (
    <div className={cx('searchList-header')}>
      {LIST_FILTERS.map(({ label, filterKey }) => (
        <Chip
          key={label}
          className={cx('filter-chip')}
          suffixIcon="chevron"
          eventCode={eventCode}
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
