import { TAllEventCode } from '@/app/_types'

export type TFilter = 'order' | 'category' | 'date' | 'region'

export type TOrder = 'popular' | 'newest' | 'ending'

export interface ISearchListItem {
  eventId: number
  eventNm: string
  eventCntn: string
  eventAddr: string
  operStatDt: string
  operEndDt: string
  operDttmCntn: string
  ctgyId: string
  ctgyNm: string
  eventTypeCd: string
  eventTypeNm: string
  likeYn: string
  viewNmvl: number
  imageUrl: string
  smallImageUrl: string
}

export interface ISearchEventParms {
  page: number
  eventCode: TAllEventCode
  keyword?: string
  sortType: string
  operStatDt?: string
  operEndDt?: string
  categories?: string
  regionGroups?: string
}

export interface IGeoData {
  rgntCd: string
  regionName: string
  rgntTypeCd: string
  cnt: number
  lcdcNm: string
}

export type RegionGroupCode = '10' | '20'

export type GeoFilterType = {
  [key in RegionGroupCode]: IGeoData[]
}

export const regionGroupMap: Record<RegionGroupCode, string> = {
  '10': '서울',
  '20': '경기도',
}

export type PopularKeywordType = {
  pplrSrchId: number
  pplrSrchCntn: string
  pplrSrchRank: string
}
