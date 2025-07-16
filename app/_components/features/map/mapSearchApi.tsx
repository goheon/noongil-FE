import { axiosApi } from '@/app/_lib'
import { EventType, DateType } from '@/app/_store/map/useMapFilterStore'

export const searchMapInfo = async (filter: {
  selectedCategories?: any
  selectedType?: EventType
  selectedDateType?: DateType
  selectedDates?: [Date | null, Date | null]
  page?: number
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
      queryString += `&eventTypeCd=${eventTypeCd}&`
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
    queryString += `operStatDt=${startDate}&operEndDt=${endDate}`
  }
  console.log(queryString)

  try {
    const response = await axiosApi.get(
      `search/events${queryString.length > 0 ? '?' + queryString : ''}`,
    )

    return response.data
  } catch (err) {
    console.log('get event info :', err)
    throw err
  }
}
