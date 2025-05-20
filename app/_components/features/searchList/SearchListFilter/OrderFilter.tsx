import styles from './OrderFilter.module.scss'
import classNames from 'classnames/bind'
import { TOrder } from '../type'

const cx = classNames.bind(styles)

const ORDER_FILTER: TOrder[] = [
  'popular',
  'newest',
  'ending',
  'region',
  'distance',
]

const ORDER_FILTER_TITLE_MAP: Record<TOrder, string> = {
  popular: '인기순',
  newest: '최신순',
  ending: '마감순',
  region: '지역별',
  distance: '거리순',
}

const OrderFilter = () => {
  return (
    <ul className={cx('list')}>
      {ORDER_FILTER.map((el) => (
        <li className={cx('list-item')} key={el}>
          {ORDER_FILTER_TITLE_MAP[el]}
        </li>
      ))}
    </ul>
  )
}

export default OrderFilter
