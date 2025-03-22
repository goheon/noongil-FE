import styles from './FilterLayout.module.scss'
import classNames from 'classnames/bind'
import { PropsWithChildren } from 'react'
import { useListFilterStore } from '@/app/_store/listFilter/useListFilterStore'

const cx = classNames.bind(styles)

const FilterLayout = (props: PropsWithChildren) => {
  const { children } = props

  const { filter, setFilter, reset, category, startDate } = useListFilterStore()

  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <div
          className={cx('filter-option', {
            'filter-option--selected': filter === 'category',
            'filter-option--active': category.length > 0,
          })}
          onClick={() => setFilter('category')}
        >
          카테고리
        </div>
        <div
          className={cx('filter-option', {
            'filter-option--selected': filter === 'date',
            'filter-option--active': startDate,
          })}
          onClick={() => setFilter('date')}
        >
          날짜
        </div>
        <div
          className={cx('filter-option', {
            'filter-option--selected': filter === 'region',
          })}
          onClick={() => setFilter('region')}
        >
          지역
        </div>
      </div>

      <div className={cx('content-container')}>{children}</div>

      <div className={cx('footer')}>
        <div className={cx('filter-list-box')}></div>
        <div className={cx('filter-btn-box')}>
          <button className={cx('btn', 'btn--reset')} onClick={() => reset()}>
            초기화
          </button>
          <button className={cx('btn', 'btn--active')}>적용하기</button>
        </div>
      </div>
    </div>
  )
}

export default FilterLayout
