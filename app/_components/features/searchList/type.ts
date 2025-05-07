import {
  EXHIBITION_CATEGORY,
  POPUP_CATEGORY,
  EXHIBITION_CATEGORY_LABELS,
  POPUP_CATEGORY_LABELS,
} from '@/app/_components/features/admin/type'

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

export type Filter = 'order' | 'category' | 'date' | 'region'

export type Order = 'popular' | 'newest' | 'ending' | 'region' | 'distance'

export type Category =
  | (typeof EXHIBITION_CATEGORY)[keyof typeof EXHIBITION_CATEGORY]
  | (typeof POPUP_CATEGORY)[keyof typeof POPUP_CATEGORY]

type CombinedCategory =
  | (typeof POPUP_CATEGORY)[keyof typeof POPUP_CATEGORY]
  | (typeof EXHIBITION_CATEGORY)[keyof typeof EXHIBITION_CATEGORY]

export const CATEGORY_LABELS: Record<CombinedCategory, string> = {
  ...POPUP_CATEGORY_LABELS,
  ...EXHIBITION_CATEGORY_LABELS,
}
