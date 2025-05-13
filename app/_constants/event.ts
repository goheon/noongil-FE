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
  BEAUTY: 'BEAU', // 뷰티
  IT: 'IT', // IT
  LIFT: 'LIFT', // 라이프스타일
  ENTER: 'ENTER', // 엔터
  SPORT: 'SPORT', // 스포츠/건강
} as const

export const POPUP_CATEGORY_LABELS: Record<TPopupCategory, string> = {
  PASH: '패션',
  CHAR: '캐릭터',
  FANDB: '식음료(F&B)',
  BEAU: '뷰티',
  IT: 'IT',
  LIFT: '라이프스타일',
  ENTER: '엔터',
  SPORT: '스포츠/건강',
}

export const POPUP_CATEGORY_VALUES = Object.values(POPUP_CATEGORY)

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

export const EXHIBITION_CATEGORY_LABELS: Record<TExhibitionCategory, string> = {
  PHOT: '사진전',
  PAINT: '그림전',
  MEDIA: '미디어 아트',
  SCULP: '조각/설치미술',
  DESIGN: '디자인',
  EXPER: '체험형 전시',
  CHILD: '어린이',
  COMIC: '만화',
}

export const EXHIBITION_CATEGORY_VALUES = Object.values(EXHIBITION_CATEGORY)

export const ALL_CATEGORY_LABELS: Record<TEventCategory, string> = {
  ...POPUP_CATEGORY_LABELS,
  ...EXHIBITION_CATEGORY_LABELS,
}
