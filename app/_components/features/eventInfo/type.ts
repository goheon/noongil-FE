import { TEventCode, TEventCategory } from '@/app/_types'

export interface IEventInfo {
  ctgyId: TEventCategory
  eventAddr: string
  eventCntn: string
  eventDetailUrl: string
  eventId: number
  eventNm: string
  eventTypeCd: TEventCode
  imageUrl: string | null
  imageUrls: string[]
  likeYn: string
  lnad: string
  operDttmCntn: string
  operEndDt: string
  operStatDt: string
  rads: string
  smallImageUrl: string
  viewNwvl: number
}
