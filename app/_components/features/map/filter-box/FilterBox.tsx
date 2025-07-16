'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames/bind'
import { startOfWeek, addDays, startOfDay } from 'date-fns'

import { DateSelectBox } from '../../searchList/SearchListFilter/DateFilter'
import {
  EventType,
  DateType,
  useMapFilterStore,
} from '@/app/_store/map/useMapFilterStore'
import { useMapStore } from '@/app/_store/map/useMapStore'

import {
  POPUP_CATEGORY_LABELS,
  POPUP_CATEGORY_VALUES,
  EXHIBITION_CATEGORY_VALUES,
  EXHIBITION_CATEGORY_LABELS,
} from '@/app/_constants/event'
import {
  TEventCategory,
  TPopupCategory,
  TExhibitionCategory,
} from '@/app/_types'

import { ICON } from '@/public'
import styles from './FilterBox.module.scss'

const cx = classNames.bind(styles)

const ALL_CATEGORY_LABELS = {
  ...POPUP_CATEGORY_LABELS,
  ...EXHIBITION_CATEGORY_LABELS,
}

const FilterBox = () => {
  // 지도스토어 내 필터 열림 상태
  const { isFilterOpen, setIsFilterOpen } = useMapStore()

  // 전역  지도용 필터 스토어 상태
  const selectedType = useMapFilterStore((state) => state.selectedType)
  const setSelectedType = useMapFilterStore((state) => state.setSelectedType)
  const selectedCategories = useMapFilterStore(
    (state) => state.selectedCategories,
  )
  const setSelectedCategories = useMapFilterStore(
    (state) => state.setSelectedCategories,
  )
  const selectedDateType = useMapFilterStore((state) => state.selectedDateType)
  const setSelectedDateType = useMapFilterStore(
    (state) => state.setSelectedDateType,
  )
  const selectedDates = useMapFilterStore((state) => state.selectedDates)
  const setSelectedDates = useMapFilterStore((state) => state.setSelectedDates)

  // 전역 상태 적용 전 필터 내부 상태
  const [onType, setOnType] = useState(selectedType)
  const [onCategories, setOnCategories] =
    useState<TEventCategory[]>(selectedCategories)
  const [onDateType, setOnDateType] = useState(selectedDateType)
  const [onDates, setOnDates] = useState(selectedDates)

  // 최상단 팝업/전시 타입 핸들러 함수
  const handleTypeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setOnType(evt.target.id as EventType)
    if (evt.target.id === 'popup') {
      setOnCategories((prev) =>
        prev.filter(
          (category) =>
            !EXHIBITION_CATEGORY_VALUES.includes(
              category as TExhibitionCategory,
            ),
        ),
      )
    }
    if (evt.target.id === 'exhibition') {
      setOnCategories((prev) =>
        prev.filter(
          (category) =>
            !POPUP_CATEGORY_VALUES.includes(category as TPopupCategory),
        ),
      )
    }
  }

  // 필터 닫기 이벤트 핸들러 함수
  // 필터를 적용하지 않고 닫음
  const handleClose = () => {
    setOnType(selectedType)
    setOnCategories(selectedCategories)
    setOnDateType(selectedDateType)
    setOnDates(selectedDates)
    setIsFilterOpen(false)
  }

  // 필터 적용하기 버튼 클릭 이벤트 핸들러 함수
  // 필터를 적용하고 닫음
  const handleApply = () => {
    setSelectedType(onType)
    setSelectedCategories(onCategories)
    setSelectedDateType(onDateType)
    setSelectedDates(onDates)
    setIsFilterOpen(false)
  }

  // 필터가 열렸을 때 전역상태를 필터 내부 상태로 최신화
  useEffect(() => {
    if (isFilterOpen) {
      setOnType(selectedType)
      setOnCategories(selectedCategories)
      setOnDateType(selectedDateType)
      setOnDates(selectedDates)
    }
  }, [isFilterOpen])

  // 주말 날짜 계산
  const getWeekend = (date: Date) => {
    const startOfThisWeek = startOfWeek(date, { weekStartsOn: 0 }) // 주 시작 (일요일)
    return {
      saturday: addDays(startOfThisWeek, 6),
      sunday: addDays(startOfThisWeek, 7),
    }
  }

  // 날짜 섹션 내 버튼 감시 및 값에 따른 내부 날짜 할당 훅
  useEffect(() => {
    const today = startOfDay(new Date())

    if (onDateType === 'today') {
      setOnDates([today, today])
    } else if (onDateType === 'weekend') {
      const { saturday, sunday } = getWeekend(new Date())
      setOnDates([saturday, sunday])
    } else {
      setOnDates([today, today])
    }
  }, [onDateType])

  // 날짜를 직접 변경한 경우, 날짜 셀렉트 타입 변경
  useEffect(() => {
    const today = startOfDay(new Date())
    const [startDate, endDate] = onDates

    if (today === startDate && today === endDate) {
    }
  }, [onDates])

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
              onClick={handleClose}
            />
            <p>필터</p>
          </div>
          <div className={cx('filter-box-body')}>
            {/* 팝업/전시 타입 필터 섹션 */}
            <TypeFilterSection
              onType={onType}
              handleTypeChange={handleTypeChange}
            />
            {/* 카테고리 필터 섹션 */}
            <CategoryFilterSection
              onCategories={onCategories}
              setOnCategories={setOnCategories}
              onType={onType}
            />
            {/* 날짜 필터 섹션 */}
            <DateFilterSection
              onDateType={onDateType}
              setOnDateType={setOnDateType}
              onDates={onDates}
              setOnDates={setOnDates}
            />
          </div>
          <div className={cx('filter-box-footer')}>
            {onCategories.length > 0 && (
              <div className={cx('filter-status')}>
                <FilterStatusResetButton setOnCategories={setOnCategories} />
                <div className={cx('selected-categories')}>
                  {onCategories.map((value: TEventCategory) => (
                    <FilterStatusChip
                      key={value}
                      value={value}
                      setOnCategories={setOnCategories}
                    />
                  ))}
                </div>
              </div>
            )}
            <div className={cx('button-box')}>
              <button className={cx('button', 'cancel')} onClick={handleClose}>
                취소
              </button>
              <button className={cx('button', 'apply')} onClick={handleApply}>
                적용하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// 팝업/전시 필터 타입 섹션 컴포넌트
const TypeFilterSection = ({
  onType,
  handleTypeChange,
}: {
  onType: EventType
  handleTypeChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <FilterSection title="팝업/전시" isActive={onType.length > 0}>
      <div className={cx('type-filter-box-buttons', 'buttons')}>
        <CheckboxButton
          name="type"
          id="all"
          label="전체"
          checked={onType === 'all'}
          onChange={handleTypeChange}
        />
        <CheckboxButton
          name="type"
          id="popup"
          label="팝업"
          checked={onType === 'popup'}
          onChange={handleTypeChange}
        />
        <CheckboxButton
          name="type"
          id="exhibition"
          label="전시"
          checked={onType === 'exhibition'}
          onChange={handleTypeChange}
        />
      </div>
    </FilterSection>
  )
}

// 카테고리 필터 타입 섹션 컴포넌트
const CategoryFilterSection = ({
  onCategories,
  setOnCategories,
  onType,
}: {
  onCategories: TEventCategory[]
  setOnCategories: React.Dispatch<React.SetStateAction<TEventCategory[]>>
  onType: EventType
}) => {
  return (
    <FilterSection title="카테고리" isActive={onCategories.length > 0}>
      <div className={cx('type-filter-box-buttons', 'buttons')}>
        {onType !== 'exhibition' &&
          POPUP_CATEGORY_VALUES.map((option) => (
            <CheckboxButton
              key={option}
              name="category"
              id={option}
              label={POPUP_CATEGORY_LABELS[option]}
              checked={onCategories.includes(option)}
              onChange={() => {
                if (onCategories.includes(option)) {
                  setOnCategories((prev: TEventCategory[]) =>
                    prev.filter((item) => item !== option),
                  )
                } else {
                  setOnCategories((prev: TEventCategory[]) => [...prev, option])
                }
              }}
            />
          ))}
        {onType !== 'popup' &&
          EXHIBITION_CATEGORY_VALUES.map((option) => (
            <CheckboxButton
              key={option}
              name="category"
              id={option}
              label={EXHIBITION_CATEGORY_LABELS[option]}
              checked={onCategories.includes(option)}
              onChange={() => {
                if (onCategories.includes(option)) {
                  setOnCategories((prev: TEventCategory[]) =>
                    prev.filter((item) => item !== option),
                  )
                } else {
                  setOnCategories((prev: TEventCategory[]) => [...prev, option])
                }
              }}
            />
          ))}
      </div>
    </FilterSection>
  )
}

const DateFilterSection = ({
  onDateType,
  setOnDateType,
  onDates,
  setOnDates,
}: {
  onDateType: DateType
  setOnDateType: (dateType: DateType) => void
  onDates: [Date | null, Date | null]
  setOnDates: (dates: [Date | null, Date | null]) => void
}) => {
  // 날짜 범위 내에 있는지 확인하는 함수
  const isInRange = (date: Date) => {
    const [startDate, endDate] = onDates
    if (!startDate || !endDate) return false // startDate 또는 endDate가 없으면 범위 적용 안함
    return date > startDate && date < endDate // 범위 내 날짜인지 확인
  }

  return (
    <FilterSection title="날짜" isActive={!!(onDates[0] && onDates[1])}>
      <div className={cx('type-filter-box-buttons', 'buttons', 'row')}>
        <CheckboxButton
          name="date"
          id="today"
          label="오늘"
          checked={onDateType === 'today'}
          onChange={() => setOnDateType('today')}
        />
        <CheckboxButton
          name="date"
          id="weekend"
          label="이번주말"
          checked={onDateType === 'weekend'}
          onChange={() => setOnDateType('weekend')}
        />
        <CheckboxButton
          name="date"
          id="nearOpen"
          label="오픈임박"
          checked={onDateType === 'nearOpen'}
          onChange={() => setOnDateType('nearOpen')}
        />
      </div>
      <div className={cx('picker-button-box')}>
        <DateSelectBox
          isMapPage={true}
          startDate={onDates[0]}
          endDate={onDates[1]}
          handleDateChange={(dates: [Date | null, Date | null]) => {
            setOnDates(dates)
            setOnDateType('')
          }}
          isInRange={isInRange}
        />
      </div>
    </FilterSection>
  )
}

// 필터 대분류 섹션 분류 wrapper
const FilterSection = ({
  title,
  isActive,
  children,
}: {
  title: string
  isActive: boolean
  children: React.ReactNode
}) => {
  return (
    <div className={cx('type-filter-box', 'section')}>
      <h3 className={cx('type-filter-box-title', 'title')}>
        {title}
        {isActive && <div className={cx('dot-blue')} />}
      </h3>
      {children}
    </div>
  )
}

// 라디오용 체크박스 버튼
const CheckboxButton = ({
  name,
  id,
  label,
  checked,
  onChange,
}: {
  name: string
  id: string
  label: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div className={cx('button')}>
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

const FilterStatusChip = ({
  value,
  setOnCategories,
}: {
  value: TEventCategory
  setOnCategories: React.Dispatch<React.SetStateAction<TEventCategory[]>>
}) => {
  return (
    <div className={cx('category-chip-button')} key={value}>
      <span className={cx('category-label')}>{ALL_CATEGORY_LABELS[value]}</span>
      <button
        className={cx('chip-delete-button')}
        onClick={() => {
          setOnCategories((prev) =>
            prev.filter((category) => category !== value),
          )
        }}
      >
        <Image src={ICON.x_icon} alt="remove-icon" width={18} height={18} />
      </button>
    </div>
  )
}

const FilterStatusResetButton = ({
  setOnCategories,
}: {
  setOnCategories: React.Dispatch<React.SetStateAction<TEventCategory[]>>
}) => {
  return (
    <button
      className={cx('filter-reset-button')}
      onClick={() => setOnCategories([])}
    >
      <Image src={ICON.reset} alt="close" width={24} height={24} />
    </button>
  )
}

export { FilterBox }
