export type EventType = 'all' | '10' | '20'

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
  dday: string
}

export const EVENT_CATEGORY_MAP: Record<string, EventType> = {
  all: 'all',
  popup: '10',
  exhibition: '20',
}
