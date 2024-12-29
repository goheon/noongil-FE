// 헤더 props
export interface HeaderProps {
  isExhibition: boolean
}

// 전시 상세 페이지 props
export interface ExhibitionDetailPageProps {
  params: {
    exhibitionNo: string
  }
}

// 팝업 상세 페이지 props
export interface PopupDetailPageProps {
  params: {
    popupNo: string
  }
}
