'use client'

import { useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames/bind'

import { DateSelectBox } from '../../searchList/SearchListFilter/DateFilter'
import { useMapFilterStore } from '@/app/_store/map/useMapFilterStore'
import { useMapStore } from '@/app/_store/map/useMapStore'

import { ICON } from '@/public'
import styles from './FilterBox.module.scss'

const cx = classNames.bind(styles)

// 뷰티, 패션, 음식, 캐릭터, 체험, 잡화, 엔터, etc
const CATEGORY_LIST = [
  {
    name: '뷰티',
    id: 'beauty',
  },
  {
    name: '패션',
    id: 'fashion',
  },

  {
    name: '음식',
    id: 'food',
  },
  {
    name: '캐릭터',
    id: 'character',
  },
  {
    name: '체험',
    id: 'experience',
  },
  {
    name: '잡화',
    id: 'miscellaneous',
  },
  {
    name: '엔터',
    id: 'entertainment',
  },
]

const FilterBox = () => {
  const { isFilterOpen, setIsFilterOpen } = useMapStore()
  const [selectedType, setSelectedType] = useState<string>('all')

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
  }

  return (
    <>
      {isFilterOpen && (
        <div className={cx('filter-box')}>
          <div className={cx('filter-box-header')}>
            <Image
              src={ICON.x_icon_black}
              alt="close"
              width={24}
              height={24}
              onClick={() => setIsFilterOpen(false)}
            />
            <p>필터</p>
          </div>
          <div className={cx('filter-box-body')}>
            <FilterSection title="팝업/전시">
              <div className={cx('type-filter-box-buttons', 'buttons')}>
                <CheckboxButton name="type" id="all" label="전체" />
                <CheckboxButton name="type" id="popup" label="팝업" />
                <CheckboxButton name="type" id="exhibition" label="전시" />
              </div>
            </FilterSection>
            <FilterSection title="카테고리">
              <div className={cx('type-filter-box-buttons', 'buttons')}>
                {CATEGORY_LIST.map((category) => (
                  <CheckboxButton
                    key={category.id}
                    name="category"
                    id={category.id}
                    label={category.name}
                  />
                ))}
              </div>
            </FilterSection>
            <FilterSection title="날짜">
              <div className={cx('type-filter-box-buttons', 'buttons', 'row')}>
                <CheckboxButton name="date" id="today" label="오늘" />
                <CheckboxButton name="date" id="week" label="이번주말" />
                <CheckboxButton name="date" id="month" label="오픈임박" />
              </div>
              <div className={cx('picker-button-box')}>
                <DateSelectBox
                  isExhibitionPage={false}
                  isMapPage={true}
                  startDate={null}
                  endDate={null}
                  handleDateChange={() => {}}
                  isInRange={() => false}
                />
              </div>
            </FilterSection>
          </div>
          <div className={cx('filter-box-footer')}>
            {/* {<div className={cx('filter-status')}>asd</div>} */}
            <div className={cx('button-box')}>
              <button className={cx('button', 'cancel')}>취소</button>
              <button className={cx('button', 'apply')}>적용하기</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const FilterSection = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className={cx('type-filter-box', 'section')}>
      <h3 className={cx('type-filter-box-title', 'title')}>
        {title}
        <div className={cx('dot-blue')} />
      </h3>
      {children}
    </div>
  )
}

// 체크박스 버튼 컴포넌트
const CheckboxButton = ({
  name,
  id,
  label,
}: {
  name: string
  id: string
  label: string
}) => {
  return (
    <div className={cx('button')}>
      <input type="checkbox" name={name} id={id} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export { FilterBox }
