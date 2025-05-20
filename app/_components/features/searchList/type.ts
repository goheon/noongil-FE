export type TFilter = 'order' | 'category' | 'date' | 'region'

export type TOrder = 'popular' | 'newest' | 'ending' | 'region' | 'distance'

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
