import { axiosApi } from '@/app/_lib/axios'
import { ISearchEventParms, GeoFilterType, PopularKeywordType } from './type'

export const bookmarkEventItem = async ({
  eventId,
  likeYn,
}: {
  eventId: number
  likeYn: string
}) => {
  try {
    const response = await axiosApi.post(
      'mark-events/save',
      {
        eventId,
        likeYn,
      },
      {
        withCredentials: true,
      },
    )

    console.log('res :', response)
  } catch (err) {
    console.log('bookmark error :', err)
    throw err
  }
}

export const getSearchEventList = async ({
  page = 0,
  eventCode = 'all',
  keyword,
  sortType,
  operStatDt,
  operEndDt,
  categories,
  regionGroups,
}: ISearchEventParms) => {
  try {
    const params: Record<string, any> = {
      page,
      eventTypeCd: eventCode,
    }

    if (keyword && keyword.trim() !== '') params.keyword = keyword
    if (operStatDt && operStatDt.trim() !== '') params.operStatDt = operStatDt
    if (operEndDt && operEndDt.trim() !== '') params.operEndDt = operEndDt
    if (categories && categories.trim() !== '') params.categories = categories
    if (regionGroups && regionGroups.trim() !== '')
      params.regionGroups = regionGroups
    if (sortType && sortType.trim() !== '') params.sortType = sortType

    const response = await axiosApi.get(`search/events`, {
      params,
      withCredentials: true,
    })

    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

export const getGeoOptions = async (): Promise<GeoFilterType> => {
  try {
    const response = await axiosApi.get('main-events/list/geoData')

    return response.data
  } catch (err) {
    console.log('geo data option :', err)
    throw err
  }
}

export const getPopularKeywords = async (): Promise<{
  events: PopularKeywordType[]
}> => {
  try {
    const response = await axiosApi.get('search/popular')
    return response.data
  } catch (err) {
    console.log('get popular keyword', err)
    throw err
  }
}
