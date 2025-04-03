import { BottomSheet } from '@/app/_components/common'
import styles from './SearchListFilter.module.scss'
import classNames from 'classnames/bind'
import DateFilter from './DateFilter'
import { useListFilterStore } from '@/app/_store/listFilter/useListFilterStore'
import OrderFilter from './OrderFilter'
import CategoryFilter from './CategoryFilter'

const cx = classNames.bind(styles)

const SearchListFilter = () => {
  const { isOpen, filter, setOpen } = useListFilterStore()

  return (
    <BottomSheet type="filter" isOpen={isOpen} setIsOpen={setOpen}>
      <div className={cx('filter-container')}>
        {(() => {
          switch (filter) {
            case 'order':
              return <OrderFilter />
            case 'category':
              return <CategoryFilter />
            case 'date':
              return <DateFilter />
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
