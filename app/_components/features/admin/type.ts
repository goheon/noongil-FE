import { TEventCode, TEventCategory } from '@/app/_types'

export interface IEventDetail {
  eventId: number
  eventNm: string
  eventCntn: string
  eventAddr: string
  operStatDt: any
  operEndDt: any
  operDttmCntn: string
  ctgyId: TEventCategory
  ppstEnbnTypeCd: TEventCode
  ctgyNm: string
  rads: string
  lnad: string
  addrLttd: number
  addrLotd: number
  ldcd: string
  eventDetailUrl: string
}

export interface IEventListItem extends IEventDetail {
  createdDate: string
  modifiedDate: string
  eventTypeCd: TEventCode
  deleteYn: string
  eventTumbfile: any
  eventFiles: any
}

export interface EventListResponse {
  data: IEventListItem[]
  total: number
}

export interface IGeocodingResponse {
  roadAddress: string // 도로명 주소
  jibunAddress: string //지번 주소
  x: string // X 좌표(경도)
  y: string // Y 좌표(위도)
  legalCode: {
    id: string
    mappingId: string
    type: string
  } // 법정동 코드
}
