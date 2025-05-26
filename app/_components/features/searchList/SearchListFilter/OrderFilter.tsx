import styles from './OrderFilter.module.scss'
import classNames from 'classnames/bind'
import { TOrder } from '../type'
import { useCallback } from 'react'
import useApplySearchParams from '../useApplySearchParams'

const cx = classNames.bind(styles)

const ORDER_FILTER: TOrder[] = ['popular', 'newest', 'ending']

const ORDER_FILTER_TITLE_MAP: Record<TOrder, string> = {
  popular: '조회순',
  newest: '최신순',
  ending: '마감순',
}

const ORDER_FILER_VALUE_MAP: Record<TOrder, string> = {
  popular: '10',
  newest: '20',
  ending: '30',
}

const OrderFilter = () => {
  const { applyParams } = useApplySearchParams()

  const applyFilter = useCallback((value: TOrder) => {
    const orderValue = ORDER_FILER_VALUE_MAP[value]

    applyParams({
      sortType: orderValue,
    })
  }, [])

  return (
    <ul className={cx('list')}>
      {ORDER_FILTER.map((value) => (
        <li
          className={cx('list-item')}
          key={value}
          onClick={() => applyFilter(value)}
        >
          {ORDER_FILTER_TITLE_MAP[value]}
        </li>
      ))}
    </ul>
  )
}

export default OrderFilter
