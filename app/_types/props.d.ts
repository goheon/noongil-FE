import { IMapStore } from '../_store/map/useMapStore'

// 헤더 props
export interface HeaderProps {
  isExhibition?: boolean
}

// 메인페이지 헤더 props
export interface MainHeaderProps extends HeaderProps {
  isSearchOpen: boolean
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>
  inputRef: React.RefObject<HTMLInputElement>
  handleSearchClick: () => void
}

// 마이페이지 헤더 props
export interface HeaderLogoBoxProps extends HeaderProps {
  isSearchOpen: boolean
  resetSearchValue?: () => void
  setIsSearchOpen:
    | React.Dispatch<React.SetStateAction<boolean>>
    | IMapStore['setIsSearchOpen']
}

// 헤더 검색박스 props
export interface SearchBoxProps {
  handleSearchClick: () => void
  isExhibition?: boolean
  inputRef: React.RefObject<HTMLInputElement>
  isSearchOpen: boolean
  closeSearchBox?: () => void
  isListSearch?: boolean
  value?: string
  setValue?: Dispatch<SetStateAction<string>>
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
