import styles from './OrderFilter.module.scss'
import classNames from 'classnames/bind'
import { TOrder } from '../type'
import { useRouter, usePathname } from 'next/navigation'
import { useCallback } from 'react'

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
  const router = useRouter()
  const pathname = usePathname()

  const applyFilter = useCallback((value: TOrder) => {
    const searchParams = new URLSearchParams(window.location.search)

    const orderValue = ORDER_FILER_VALUE_MAP[value]

    searchParams.set('sortType', orderValue)

    router.push(`${pathname}?${searchParams.toString()}`)
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
