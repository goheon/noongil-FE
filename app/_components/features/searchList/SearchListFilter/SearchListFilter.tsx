import { BottomSheet } from '@/app/_components/common'
import styles from './SearchListFilter.module.scss'
import classNames from 'classnames/bind'
import DateFilter from './DateFilter'
import { useListFilterStore } from '@/app/_store/listFilter/useListFilterStore'
import OrderFilter from './OrderFilter'
import CategoryFilter from './CategoryFilter'
import { TEventCodeName } from '@/app/_types'

const cx = classNames.bind(styles)

interface SearchListFilterProps {
  eventCode: TEventCodeName
}

const SearchListFilter = (props: SearchListFilterProps) => {
  const { eventCode } = props

  const { isOpen, filter, setOpen } = useListFilterStore()

  return (
    <BottomSheet
      type="filter"
      isOpen={isOpen}
      setIsOpen={setOpen}
      isExhibitionPage={eventCode === 'exhibition'}
    >
      <div className={cx('filter-container')}>
        {(() => {
          switch (filter) {
            case 'order':
              return <OrderFilter />
            case 'category':
              return (
                <CategoryFilter isExhibitionPage={eventCode === 'exhibition'} />
              )
            case 'date':
              return (
                <DateFilter isExhibitionPage={eventCode === 'exhibition'} />
              )
            case 'region':
              return <div>지역 필터</div>
            default:
              return null
          }
        })()}
      </div>
    </BottomSheet>
  )
}

export default SearchListFilter
