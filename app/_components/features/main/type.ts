import { TEventCategory } from '@/app/_types'

export interface IListItem {
  eventId: number
  eventNm: string
  operStatDt: string
  operEndDt: string
  ctgyId: string
  eventTypeCd: string
  likeYn: string
  imageUrl: string
  smallImageUrl: string
  lnad: string
  dday: string
}

export interface IUserRecommendListResponse {
  all: IListItem[]
  categories: Record<TEventCategory, IListItem[]>
}
