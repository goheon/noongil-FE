import { LogoBox, SearchBox, RnPsearchBox } from '../Header'

import { MainHeaderProps } from '@/app/_types'

import styles from './MainHeader.module.scss'

// 메인페이지헤더
const MainHeader: React.FC<MainHeaderProps> = ({
  isSearchOpen,
  setIsSearchOpen,
  isExhibition,
  inputRef,
  handleSearchClick,
}) => {
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
        />
      </div>
      {/* 검색 포커스 확장 최근, 인기 검색 목록 */}
      {isSearchOpen && <RnPsearchBox />}
    </>
  )
}

export { MainHeader }
