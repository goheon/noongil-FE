'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { LogoBox, SearchBox } from '../Header'

import { useMapStore } from '@/app/_store/map/useMapStore'
import { useMapFilterStore } from '@/app/_store/map/useMapFilterStore'
import { HeaderProps } from '@/app/_types'
import styles from './MapPageHeader.module.scss'

// 지도페이지헤더
const MapPageHeader: React.FC<HeaderProps> = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const isSearchOpen = useMapStore((state) => state.isSearchOpen)
  const setIsSearchOpen = useMapStore.getState().setIsSearchOpen
  const setSelectedType = useMapFilterStore.getState().setSelectedType
  const pathname = usePathname()

  useEffect(() => {
    setIsSearchOpen(false)
    setSelectedType('ALL')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }, [pathname, setSelectedType, setIsSearchOpen])

  // 검색창 클릭 및 터치 핸들러 함수
  const handleSearchClick = () => {
    setIsSearchOpen(true)
    inputRef?.current?.focus()
  }

  return (
    <>
      {/* 헤더 검색 바 */}
      <div className={`${styles['header_search-bar']}`}>
        {/* 로고 박스 */}
        <LogoBox
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />
        {/* 검색창 박스 */}
        <SearchBox
          handleSearchClick={handleSearchClick}
          inputRef={inputRef}
          isSearchOpen={isSearchOpen}
        />
      </div>
      {/* 검색 포커스 확장 최근, 인기 검색 목록 */}
      {isSearchOpen && <MapSearchBox />}
    </>
  )
}

const MapSearchBox = () => {
  return (
    <div className={`${styles['search-box']}`}>
      <div className={`${styles['search-empty-box']}`}>
        <p className={`${styles['search-empty-box_p']}`}>
          검색결과가 없습니다.
          <br />
          검색어를 변경해 보세요.
        </p>
      </div>
    </div>
  )
}

export { MapPageHeader }
