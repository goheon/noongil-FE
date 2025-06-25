import { LogoBox, SearchBox } from '../Header'

import { MainHeaderProps } from '@/app/_types'

import styles from './MainHeader.module.scss'
import SearchSuggestionBox from './SearchSuggestionBox'

// 메인페이지헤더
const MainHeader: React.FC<MainHeaderProps> = ({
  isSearchOpen,
  setIsSearchOpen,
  isExhibition,
  inputRef,
  handleSearchClick,
}) => {
  const closeSearchBox = () => {
    setIsSearchOpen(false)
  }

  return (
    <>
      {/* 헤더 검색 바 */}
      <div className={`${styles['header_search-bar']}`}>
        {/* 로고 박스 */}
        <LogoBox
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          isExhibition={isExhibition}
        />
        {/* 검색창 박스 */}
        <SearchBox
          handleSearchClick={handleSearchClick}
          inputRef={inputRef}
          isExhibition={isExhibition}
          isSearchOpen={isSearchOpen}
          closeSearchBox={closeSearchBox}
          isListSearch
        />
      </div>
      {/* 검색 포커스 확장 최근, 인기 검색 목록 */}
      {isSearchOpen && (
        <SearchSuggestionBox
          isExhibition={isExhibition ?? false}
          closeSearchBox={closeSearchBox}
        />
      )}
    </>
  )
}

export { MainHeader }
