import {
  isSameDay,
  addDays,
  startOfWeek,
  format,
  parse,
  isBefore,
} from 'date-fns'

export const formatDate = (date: Date) => {
  return format(date, 'MM.dd')
}

export const isToday = (startDate: Date, endDate: Date) => {
  return isSameDay(startDate, new Date()) && isSameDay(endDate, new Date())
}

// 주말 날짜 계산
export const getWeekend = (date: Date) => {
  const startOfThisWeek = startOfWeek(date, { weekStartsOn: 0 }) // 주 시작 (일요일)

  return {
    saturday: addDays(startOfThisWeek, 6),
    sunday: addDays(startOfThisWeek, 7),
  }
}

export const isWeekend = (startDate: Date, endDate: Date) => {
  const { saturday, sunday } = getWeekend(new Date())

  return isSameDay(startDate, saturday) && isSameDay(endDate, sunday)
}

// 7일 후 & 8일 후 날짜 계산
export const getDateAfterAWeek = (date: Date) => ({
  sevenDaysLater: addDays(date, 7),
  eightDaysLater: addDays(date, 8),
})

export const isAfterAWeek = (startDate: Date, endDate: Date) => {
  const { sevenDaysLater, eightDaysLater } = getDateAfterAWeek(new Date())

  return (
    isSameDay(startDate, sevenDaysLater) && isSameDay(endDate, eightDaysLater)
  )
}

export const getDateLabel = (startDate: Date, endDate: Date): string => {
  if (isToday(startDate, endDate)) return '오늘'
  if (isWeekend(startDate, endDate)) return '주말'
  if (isAfterAWeek(startDate, endDate)) return '7일 후'

  return `${formatDate(startDate)} ~ ${formatDate(endDate)}`
}

// 오늘을 기준으로 날짜가 지났는지 확인
export const isPastDate = (dateString: string) => {
  const year = dateString.slice(0, 4)
  const month = dateString.slice(4, 6)
  const day = dateString.slice(6, 8)

  // 'YYMMDD' 형식에서 'YYYY-MM-DD' 형식으로 변환
  const date = parse(`${year}-${month}-${day}`, 'yyyy-MM-dd', new Date())

  // 오늘 날짜와 비교
  const today = new Date()
  today.setHours(0, 0, 0, 0) // 오늘 자정으로 시간 초기화

  return isBefore(date, today) // date가 today보다 이전인지 확인
}
