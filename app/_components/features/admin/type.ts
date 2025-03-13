export const EVENT_OPTION = {
  POPUPSTORE: '10', // 팝업스토어
  EXHIBITION: '20', // 전시
} as const

export type EventOption = (typeof EVENT_OPTION)[keyof typeof EVENT_OPTION]

export const POPUP_CATEGORY = {
  FASHION: 'PASH', // 패션
  CHARACTER: 'CHAR', // 캐릭터
  FANDB: 'FANDB', // 식음료(F&B)
  BEAUTY: 'BEAU', // 뷰티
  IT: 'IT', // IT
  LIFT: 'LIFT', // 라이프스타일
  ENTER: 'ENTER', // 엔터
  SPORT: 'SPORT', // 스포츠/건강
} as const

export const POPUP_CATEGORY_LABELS: Record<
  (typeof POPUP_CATEGORY)[keyof typeof POPUP_CATEGORY],
  string
> = {
  PASH: '패션',
  CHAR: '캐릭터',
  FANDB: '식음료(F&B)',
  BEAU: '뷰티',
  IT: 'IT',
  LIFT: '라이프스타일',
  ENTER: '엔터',
  SPORT: '스포츠/건강',
}

export const POPUP_OPTION_VALUES = Object.values(POPUP_CATEGORY)

export const EXHIBITION_CATEGORY = {
  PHOTOGRAPHY: 'PHOT', // 사진전
  PAINTING: 'PAINT', // 그림전
  MEDIA_ART: 'MEDIA', // 미디어 아트
  SCULPTURE: 'SCULP', // 조각/설치미술
  DESIGN: 'DESIGN', // 디자인
  EXPERIENCE: 'EXPER', // 체험형 전시
  CHILDREN: 'CHILD', // 어린이
  COMICS: 'COMIC', // 만화
} as const

export const EXHIBITION_CATEGORY_LABELS: Record<
  (typeof EXHIBITION_CATEGORY)[keyof typeof EXHIBITION_CATEGORY],
  string
> = {
  PHOT: '사진전',
  PAINT: '그림전',
  MEDIA: '미디어 아트',
  SCULP: '조각/설치미술',
  DESIGN: '디자인',
  EXPER: '체험형 전시',
  CHILD: '어린이',
  COMIC: '만화',
}

export const EXHIBITION_OPTION_VALUES = Object.values(EXHIBITION_CATEGORY)

export type EventCategory =
  | (typeof POPUP_CATEGORY)[keyof typeof POPUP_CATEGORY]
  | (typeof EXHIBITION_CATEGORY)[keyof typeof EXHIBITION_CATEGORY]

export const EVENT_OPTION_VALUES = Object.values(EVENT_OPTION)

export interface IEventDetail {
  eventId: number
  eventNm: string
  eventCntn: string
  eventAddr: string
  operStatDt: any
  operEndDt: any
  operDttmCntn: string
  ctgyId: EventCategory
  ppstEnbnTypeCd: EventOption
  ctgyNm: string
  rads: string
  lnad: string
  addrLttd: number
  addrLotd: number
  ldcd: string
}

export interface IEventListItem extends IEventDetail {
  createdDate: string
  modifiedDate: string
  eventTypeCd: EventOption
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
  englishAddress: string // 영어 주소
  addressElements: any[] // 주소 구성 요소 정보
  x: string // X 좌표(경도)
  y: string // Y 좌표(위도)
  distance: any // 중심 좌표로부터의 거리(m)
}
