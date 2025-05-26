'use client'

import styles from './FilterLayout.module.scss'
import classNames from 'classnames/bind'
import { PropsWithChildren, useCallback, useMemo } from 'react'
import { useListFilterStore } from '@/app/_store/listFilter/useListFilterStore'
import Image from 'next/image'
import { ICON } from '@/public'
import { getDateLabel } from '@/app/_utils/date'
import { format } from 'date-fns'
import { ALL_CATEGORY_LABELS } from '@/app/_constants/event'
import { SEOUL_REGIONS } from '@/app/_constants/region'
import useApplySearchParams from '../useApplySearchParams'

const cx = classNames.bind(styles)

interface FilterLayoutProps {
  isExhibitionPage?: boolean
}

const FilterLayout = (props: PropsWithChildren<FilterLayoutProps>) => {
  const { children, isExhibitionPage } = props

  const {
    filter,
    setFilter,
    reset,
    category,
    setCategory,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    regions,
    setRegion,
  } = useListFilterStore()

  const { applyParams } = useApplySearchParams()

  const dateLabel = useMemo(() => {
    return startDate && endDate ? getDateLabel(startDate, endDate) : null
  }, [startDate, endDate])

  const deleteDateFilter = () => {
    setStartDate(null)
    setEndDate(null)
  }

  const applyFilter = useCallback(() => {
    applyParams({
      categories: category.length ? category.join(',') : null,
      startDate: startDate ? format(startDate, 'yyyyMMdd') : null,
      endDate: endDate ? format(endDate, 'yyyyMMdd') : null,
      regions: regions.length ? regions.join(',') : null,
    })
  }, [category, startDate, endDate, regions])

  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <div
          className={cx('filter-option', {
            'filter-option--selected': filter === 'category',
            'filter-option--selected--exhibition':
              filter === 'category' && isExhibitionPage,
            'filter-option--active': category.length > 0,
          })}
          onClick={() => setFilter('category')}
        >
          카테고리
        </div>
        <div
          className={cx('filter-option', {
            'filter-option--selected': filter === 'date',
            'filter-option--selected--exhibition':
              filter === 'date' && isExhibitionPage,
            'filter-option--active': startDate,
          })}
          onClick={() => setFilter('date')}
        >
          날짜
        </div>
        <div
          className={cx('filter-option', {
            'filter-option--selected': filter === 'region',
            'filter-option--selected--exhibition':
              filter === 'region' && isExhibitionPage,
            'filter-option--active': regions.length > 0,
          })}
          onClick={() => setFilter('region')}
        >
          지역
        </div>
      </div>

      <div className={cx('content-container')}>{children}</div>

      <div className={cx('footer')}>
        <div className={cx('filter-list-box')}>
          {category &&
            category.map((categoryValue) => (
              <div className={cx('filter-list-item')} key={categoryValue}>
                <div>{ALL_CATEGORY_LABELS[categoryValue]}</div>
                <div onClick={() => setCategory(categoryValue)}>
                  <Image src={ICON.x_icon} alt="close" width={18} height={18} />
                </div>
              </div>
            ))}
          {dateLabel && (
            <div className={cx('filter-list-item')} key={dateLabel}>
              {dateLabel}

              <div onClick={deleteDateFilter}>
                <Image src={ICON.x_icon} alt="close" width={18} height={18} />
              </div>
            </div>
          )}

          {regions &&
            regions.map((regionValue) => (
              <div className={cx('filter-list-item')} key={regionValue}>
                <div>{SEOUL_REGIONS[regionValue].regionName}</div>
                <div onClick={() => setRegion(regionValue)}>
                  <Image src={ICON.x_icon} alt="close" width={18} height={18} />
                </div>
              </div>
            ))}
        </div>
        <div className={cx('filter-btn-box')}>
          <button
            className={cx('btn', 'btn--reset', {
              'btn--reset--exhibition': isExhibitionPage,
            })}
            onClick={() => reset()}
          >
            초기화
          </button>
          <button
            className={cx('btn', 'btn--active', {
              'btn--active--exhibition': isExhibitionPage,
            })}
            onClick={applyFilter}
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterLayout
