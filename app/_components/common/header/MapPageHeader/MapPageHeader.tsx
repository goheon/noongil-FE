import { LogoBox, SearchBox } from '../Header'

import { MainHeaderProps } from '@/app/_types'
import styles from './MapPageHeader.module.scss'

// 지도페이지헤더
const MapPageHeader: React.FC<MainHeaderProps> = ({
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
      {isSearchOpen && <MapSearchBox />}
    </>
  )
}

const MapSearchBox = () => {
  return <div className={`${styles['search-box']}`}>asd</div>
}

export { MapPageHeader }
