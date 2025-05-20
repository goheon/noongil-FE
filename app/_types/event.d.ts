// 전시, 팝업 이벤트 타입
export type TEventCode = '10' | '20'
export type TEventCodeName = 'popup' | 'exhibition' | 'all'
export type TAllEventCode = 'all' | TEventCode

export type TPopupCategory =
  | 'PASH'
  | 'CHAR'
  | 'FANDB'
  | 'BEAU'
  | 'IT'
  | 'LIFT'
  | 'ENTER'
  | 'SPORT'

export type TExhibitionCategory =
  | 'PHOT'
  | 'PAINT'
  | 'MEDIA'
  | 'SCULP'
  | 'DESIGN'
  | 'EXPER'
  | 'CHILD'
  | 'COMIC'

export type TEventCategory = TPopupCategory | TExhibitionCategory
