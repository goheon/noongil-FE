import {
  TAllEventCode,
  TEventCategory,
  TPopupCategory,
  TExhibitionCategory,
} from '../_types'

export const EVENT_CODE = {
  POPUPSTORE: '10', // 팝업스토어
  EXHIBITION: '20', // 전시
} as const

export const EVENT_CODE_VALUES = Object.values(EVENT_CODE)

export const ALL_EVENT_CODE_MAP: Record<string, TAllEventCode> = {
  all: 'all',
  popup: '10',
  exhibition: '20',
}

export const POPUP_CATEGORY = {
  FASHION: 'PASH', // 패션
  CHARACTER: 'CHAR', // 캐릭터
  FANDB: 'FANDB', // 식음료(F&B)
  IT: 'IT', // IT
  ENTER: 'ENTER', // 엔터
  FLMA: 'FLMA',
} as const

export const POPUP_CATEGORY_LABELS: Record<TPopupCategory, string> = {
  PASH: '패션/뷰티',
  CHAR: '캐릭터',
  FANDB: '식음료(F&B)',
  IT: '테크/라이프',
  ENTER: '엔터',
  FLMA: '플리마켓',
}

export const POPUP_CATEGORY_VALUES = Object.values(POPUP_CATEGORY)

export const EXHIBITION_CATEGORY = {
  PHOTOGRAPHY: 'PHOT', // 사진전
  PAINTING: 'PAINT', // 그림전
  SCULPTURE: 'SCULP', // 조각/설치미술
  DESIGN: 'DESIGN', // 디자인
  COMICS: 'COMIC', // 만화
} as const

export const EXHIBITION_CATEGORY_LABELS: Record<TExhibitionCategory, string> = {
  PHOT: '사진전',
  PAINT: '그림전',
  SCULP: '조각/설치미술',
  DESIGN: '디자인',
  COMIC: '만화',
}

export const EXHIBITION_CATEGORY_VALUES = Object.values(EXHIBITION_CATEGORY)

export const ALL_CATEGORY_LABELS: Record<TEventCategory, string> = {
  ...POPUP_CATEGORY_LABELS,
  ...EXHIBITION_CATEGORY_LABELS,
}
