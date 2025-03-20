import styles from './DateFilter.module.scss'
import classNames from 'classnames/bind'
import { useListFilterStore } from '@/app/_store/listFilter/useListFilterStore'
import FilterLayout from './FilterLayout'
import { Checkbox, Chip } from '@/app/_components/ui'
import { useMemo } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/locale'
import { format, isSameDay, startOfWeek, addDays } from 'date-fns'

const cx = classNames.bind(styles)

const DateFilter = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useListFilterStore()

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates

    setStartDate(start) // 시작 날짜
    setEndDate(end) // 종료 날짜
  }

  // 날짜 범위 내에 있는지 확인하는 함수
  const isInRange = (date: Date) => {
    if (!startDate || !endDate) return false // startDate 또는 endDate가 없으면 범위 적용 안함
    return date > startDate && date < endDate // 범위 내 날짜인지 확인
  }

  const formattedStartDate = useMemo(
    () =>
      startDate ? format(startDate, 'MM.dd') : format(new Date(), 'MM.dd'),
    [startDate],
  )

  const formattedEndDate = useMemo(
    () => (endDate ? format(endDate, 'MM.dd') : format(new Date(), 'MM.dd')),
    [endDate],
  )

  // 오늘 날짜 설정
  const handleTodayChange = () => {
    setStartDate(new Date())
    setEndDate(new Date())
  }

  const todayChecked = useMemo(() => {
    if (!startDate || !endDate) return false

    return isSameDay(startDate, new Date()) && isSameDay(endDate, new Date())
  }, [startDate, endDate])

  // 주말 날짜 계산
  const getWeekend = (date: Date) => {
    const startOfThisWeek = startOfWeek(date, { weekStartsOn: 0 }) // 주 시작 (일요일)
    return {
      saturday: addDays(startOfThisWeek, 6),
      sunday: addDays(startOfThisWeek, 7),
    }
  }

  const handleWeekendChange = () => {
    const { saturday, sunday } = getWeekend(new Date())
    setStartDate(saturday)
    setEndDate(sunday)
  }

  const weekendChecked = useMemo(() => {
    if (!startDate || !endDate) return false
    const { saturday, sunday } = getWeekend(new Date())
    return isSameDay(startDate, saturday) && isSameDay(endDate, sunday)
  }, [startDate, endDate])

  // 7일 후 & 8일 후 날짜 계산
  const getSevenEightDaysAfter = (date: Date) => ({
    sevenDaysLater: addDays(date, 7),
    eightDaysLater: addDays(date, 8),
  })

  const handleSevenEightDaysChange = () => {
    const { sevenDaysLater, eightDaysLater } = getSevenEightDaysAfter(
      new Date(),
    )
    setStartDate(sevenDaysLater)
    setEndDate(eightDaysLater)
  }

  const sevenEightDaysChecked = useMemo(() => {
    if (!startDate || !endDate) return false
    const { sevenDaysLater, eightDaysLater } = getSevenEightDaysAfter(
      new Date(),
    )
    return (
      isSameDay(startDate, sevenDaysLater) && isSameDay(endDate, eightDaysLater)
    )
  }, [startDate, endDate])

  return (
    <FilterLayout>
      <div className={cx('container')}>
        <div className={cx('date-option-box')}>
          <Checkbox
            label="오늘"
            checked={todayChecked}
            onChange={handleTodayChange}
          />
          <Checkbox
            label="이번주말"
            checked={weekendChecked}
            onChange={handleWeekendChange}
          />
          <Checkbox
            label="+7일"
            checked={sevenEightDaysChecked}
            onChange={handleSevenEightDaysChange}
          />
        </div>

        <div className={cx('date-select-box')}>
          <div className={cx('notice')}>직접 입력</div>

          <DatePicker
            calendarClassName={cx('custom-calendar')}
            dateFormat="yyyy.MM.dd"
            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
            minDate={new Date('2000-01-01')}
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            selectsStart
            selectsEnd
            dayClassName={(date) =>
              cx('custom-day', {
                'custom-day--range': isInRange(date),
                'custom-day--selected':
                  date.getTime() === startDate?.getTime() ||
                  date.getTime() === endDate?.getTime(),
              })
            }
            locale={ko} // 한국어 로케일 적용
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
              <div className={cx('custom-header')}>
                <button onClick={decreaseMonth}>&lt;</button>
                <span>{date.toLocaleString('ko-KR', { month: 'long' })}</span>
                <button onClick={increaseMonth}>&gt;</button>
              </div>
            )}
            customInput={
              <div className={cx('select-info')}>
                <Chip className={cx('date-select')} suffixIcon="calendar">
                  {formattedStartDate}
                </Chip>
                <div className={cx('bar')}>-</div>
                <Chip className={cx('date-select')} suffixIcon="calendar">
                  {formattedEndDate}
                </Chip>
              </div>
            }
          />
        </div>
      </div>
    </FilterLayout>
  )
}

export default DateFilter
