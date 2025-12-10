import { axiosApi } from '@/app/_lib'
import { DateType, EventType } from '@/app/_store/map/useMapFilterStore'

export const searchMapInfo = async (filter: {
  selectedCategories?: any
  selectedType?: EventType
  selectedDateType?: DateType
  selectedDates?: [Date | null, Date | null]
  page?: number
  latitude?: number | null
  longitude?: number | null
}) => {
  let queryString = ''
  if (
    filter.selectedCategories.length > 0 &&
    Array.isArray(filter.selectedCategories)
  ) {
    const categoryQuery = filter.selectedCategories.reduce(
      (acc, curr, index) => {
        const prefix = index === 0 ? '' : '&'
        return acc + `${prefix}categories=${encodeURIComponent(curr)}`
      },
      '',
    )
    queryString += categoryQuery
  }
  if (filter.selectedType && filter.selectedType !== 'all') {
    const eventTypeCd =
      filter.selectedType === 'popup'
        ? '10'
        : filter.selectedType === 'exhibition'
          ? '20'
          : ''

    if (eventTypeCd) {
      queryString += `&eventTypeCd=${eventTypeCd}`
    }
  }
  if (filter.selectedDates?.every((d) => d !== null)) {
    const startDate = filter.selectedDates[0]
      ?.toISOString()
      .slice(0, 10)
      .replace(/-/g, '')
    const endDate = filter.selectedDates[1]
      ?.toISOString()
      .slice(0, 10)
      .replace(/-/g, '')
    queryString += `&operStatDt=${startDate}&operEndDt=${endDate}`
  }
  if (filter.page !== undefined && filter.page >= 0)
    queryString += `&page=${filter.page}`

  // 위도/경도 필터 추가
  if (filter.latitude !== null && filter.latitude !== undefined) {
    queryString += `&latitude=${filter.latitude}`
  }
  if (filter.longitude !== null && filter.longitude !== undefined) {
    queryString += `&longitude=${filter.longitude}`
  }

  try {
    const response = await axiosApi.get(
      `search/events${queryString.length > 0 ? '?' + queryString : ''}`,
    )

    return response.data
  } catch (err) {
    // console.log('get event info :', err)
    throw err
  }
}
