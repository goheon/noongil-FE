import styles from './SearchListHeader.module.scss'
import classNames from 'classnames/bind'
import { Chip } from '@/app/_components/ui'
import { useListFilterStore } from '@/app/_store/listFilter/useListFilterStore'
import { TFilter, TOrder } from '../type'
import { TEventCodeName } from '@/app/_types'
import { useMemo } from 'react'

const cx = classNames.bind(styles)

const LIST_FILTERS: { label: string; filterKey: TFilter | null }[] = [
  { label: '조회순', filterKey: 'order' },
  { label: '카테고리', filterKey: 'category' },
  { label: '날짜', filterKey: 'date' },
  { label: '지역', filterKey: 'region' }, // 지역 필터는 setFilter 호출하지 않음
]

const ORDER_FILTER_TITLE_MAP: Record<TOrder, string> = {
  popular: '조회순',
  newest: '최신순',
  ending: '마감순',
}

interface SearchListHeaderProps {
  eventCode?: TEventCodeName
}

const SearchListHeader = (props: SearchListHeaderProps) => {
  const { eventCode = 'popup' } = props
  const { setOpen, setFilter, order } = useListFilterStore()

  const currentOrder = useMemo(() => (order ? order : 'popular'), [order])

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
          {label === '조회순' ? ORDER_FILTER_TITLE_MAP[currentOrder] : label}
        </Chip>
      ))}
    </div>
  )
}

export default SearchListHeader
