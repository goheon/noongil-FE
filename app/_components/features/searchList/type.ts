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
