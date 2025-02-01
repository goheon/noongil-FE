// 헤더 props
export interface HeaderProps {
  isExhibition: boolean
}

// 메인페이지 헤더 props
export interface MainPageHeaderProps extends HeaderProps {
  isSearchOpen: boolean
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>
  inputRef: React.RefObject<HTMLInputElement>
  handleSearchClick: () => void
}

// 마이페이지 헤더 props
export interface MyPageHeaderProps extends HeaderProps {
  isSearchOpen: boolean
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// 헤더 검색박스 props
export interface SearchBoxProps {
  handleSearchClick: () => void
  isExhibition: boolean
  inputRef: React.RefObject<HTMLInputElement>
  isSearchOpen: boolean
}

// 전시 상세 페이지 props
export interface ExhibitionDetailPageProps {
  params: Promise<{
    exhibitionNo: string
  }>
}

// 팝업 상세 페이지 props
export interface PopupDetailPageProps {
  params: Promise<{
    popupNo: string
  }>
}
