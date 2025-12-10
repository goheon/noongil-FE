import { useCallback, useEffect, useRef } from 'react'

import { LogoBox, SearchBox } from '../Header'
import SearchSuggestionBox from './SearchSuggestionBox'

import { useListFilterStore } from '@/app/_store/listFilter/useListFilterStore'

import { MainHeaderProps } from '@/app/_types'

import styles from './MainHeader.module.scss'
import { usePathname, useSearchParams } from 'next/navigation'

// 메인페이지헤더
const MainHeader: React.FC<MainHeaderProps> = ({
  isSearchOpen,
  setIsSearchOpen,
  isExhibition,
  inputRef,
  handleSearchClick,
}) => {
  const setOpen = useListFilterStore((s) => s.setOpen)

  useEffect(() => {
    if (isSearchOpen) setOpen(false)
  }, [isSearchOpen, setOpen])

  const closeSearchBox = useCallback(() => {
    setIsSearchOpen(false)
  }, [setIsSearchOpen])

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchParamsToString = searchParams.toString()
  const isMounted = useRef(false)

  useEffect(() => {
    // isMounted ref가 true일 때만, 즉 첫 렌더링 이후에만 실행됩니다.
    if (isMounted.current) {
      closeSearchBox()
    } else {
      // 첫 렌더링 시점(컴포넌트가 뜰 때)에는 ref의 값만 true로 바꿔줍니다.
      isMounted.current = true
    }
  }, [pathname, searchParamsToString, closeSearchBox])

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
