export type EventCategory = 'all' | 'PPST' | 'ENBN'

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

export const EVENT_CATEGORY_MAP: Record<string, EventCategory> = {
  all: 'all',
  popup: 'PPST',
  exhibition: 'ENBN',
}
