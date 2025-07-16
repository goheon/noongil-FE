'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'

import { MainHeader } from './MainHeader/MainHeader'
import { MapPageHeader } from './MapPageHeader/MapPageHeader'
import { MyPageHeader } from './MyPageHeader/MyPageHeader'
import { LoginHeader } from './LoginPageHeader/LoginPageHeader'

import { useListFilterStore } from '@/app/_store/listFilter/useListFilterStore'
import { useKeywordHistoryStore } from '@/app/_store/keywordHistory/useKeywordHistory'
import { useMapStore } from '@/app/_store/map/useMapStore'
import useApplySearchParams from '../../features/searchList/useApplySearchParams'

import { HeaderProps, HeaderLogoBoxProps, SearchBoxProps } from '@/app/_types'
import { ICON } from '@/public'
import styles from './header.module.scss'

// 헤더
const Header: React.FC<HeaderProps> = ({ isExhibition }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // 검색창 클릭 및 터치 핸들러 함수
  const handleSearchClick = () => {
    setIsSearchOpen(true)
    inputRef?.current?.focus()
  }

  return (
    <div className={`${styles.header} ${isExhibition && styles.exhibition}`}>
      {(() => {
        switch (true) {
          case pathname.startsWith('/my'):
            return <MyPageHeader />

          case pathname.startsWith('/map'):
            return <MapPageHeader />

          case pathname.startsWith('/login'):
            return <LoginHeader />

          default:
            return (
              <MainHeader
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
                isExhibition={isExhibition}
                inputRef={inputRef}
                handleSearchClick={handleSearchClick}
              />
            )
        }
      })()}
    </div>
  )
}

// 검색창 인풋 박스
const SearchBox: React.FC<SearchBoxProps> = ({
  handleSearchClick,
  isExhibition,
  inputRef,
  isSearchOpen,
  closeSearchBox,
  isListSearch,
}) => {
  const { keyword, setKeyword } = useListFilterStore()
  const { addHistory } = useKeywordHistoryStore()

  const [searchValue, setSearchValue] = useState('')
  const handleDeleteClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation()
    setSearchValue('')
  }

  const { applyParams } = useApplySearchParams()

  useEffect(() => {
    if (isListSearch && keyword) {
      setSearchValue(keyword)
    }
  }, [isListSearch, keyword])

  const searchKeyword = useCallback(() => {
    if (!isListSearch) {
      return
    }

    const value = searchValue.trim()

    setKeyword(value || '')

    if (closeSearchBox) {
      closeSearchBox()
    }

    // 0ms 딜레이를 주어 다음 이벤트 루프로 밀기
    setTimeout(() => {
      applyParams({
        keyword: value,
      })
      addHistory(value)
    }, 0)
  }, [searchValue, setKeyword, isListSearch, closeSearchBox])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchKeyword()
    }
  }

  return (
    <div
      className={`${styles['header_search-bar_search-box']}`}
      onClick={() => handleSearchClick()}
    >
      {/* 검색 인풋 */}
      <input
        className={`${styles['header_search-bar_search-box_input']} ${isExhibition && `${styles['header_search-bar_search-box_input_exhibition']}`}`}
        type="text"
        name="search"
        value={searchValue}
        ref={inputRef}
        onChange={(evt) => setSearchValue(evt.target.value)}
        placeholder={isSearchOpen ? '장소, 테마를 검색해보세요.' : undefined}
        autoComplete="off"
        onKeyDown={handleKeyDown}
      />
      {searchValue.length > 0 && (
        <button
          className={`${styles['header_search-bar_search-box_button']} ${styles['delete-button']}`}
          type="button"
          aria-label="Search"
          onClick={handleDeleteClick}
        >
          <Image
            className={`${styles['delete-icon']}`}
            src={ICON.delete}
            alt="delete Icon"
            width={20}
            height={20}
          />
        </button>
      )}
      <button
        className={`${styles['header_search-bar_search-box_button']}`}
        type="button"
        aria-label="Search"
        onClick={(e) => {
          e.stopPropagation()
          searchKeyword()
        }}
      >
        <Image
          className={`${styles['header_search-bar_search-box_icon']}`}
          src={ICON.search}
          alt="Search Icon"
          width={30}
          height={30}
        />
      </button>
    </div>
  )
}

// 헤더 로고 박스 컴포넌트
const LogoBox: React.FC<HeaderLogoBoxProps> = ({
  isSearchOpen,
  setIsSearchOpen,
  isExhibition,
}) => {
  const pathname = usePathname()
  const router = useRouter()
  const setIsListSheetOpen = useMapStore((s) => s.setIsListSheetOpen)
  const setIsListSheetShowing = useMapStore((s) => s.setIsListSheetShowing)
  const isSelectSheetOpen = useMapStore((s) => s.isSelectSheetOpen)
  const setIsSelectSheetOpen = useMapStore((s) => s.setIsSelectSheetOpen)
  const setIsSelectSheetShowing = useMapStore((s) => s.setIsSelectSheetShowing)

  useEffect(() => {
    if (
      !pathname.includes('map') &&
      !pathname.includes('lists') &&
      pathname.split('/').length < 4
    ) {
      setIsSelectSheetOpen(false)
      setIsSelectSheetShowing(false)
    }
  }, [pathname])

  return (
    <div
      className={`${styles['header_search-bar_logo-box']}`}
      onClick={() => {
        if (isSearchOpen) {
          setIsSearchOpen(false)
          setIsListSheetShowing(true)
        } else if (isSelectSheetOpen) {
          setIsSelectSheetOpen(false)
          setIsSelectSheetShowing(false)
          setIsListSheetShowing(true)
          setIsListSheetOpen(true)
          if (!pathname.includes('map')) {
            router.back()
          }
        } else {
          if (pathname.includes('exhibition')) {
            router.push('/exhibition')
          } else if (pathname.includes('popup')) {
            router.push('/popup')
          } else {
            router.push('/')
          }
        }
      }}
    >
      {isSearchOpen || isSelectSheetOpen ? (
        !isExhibition ? (
          <Image
            className={`${styles['header_search-bar_logo-box_icon']}`}
            src={ICON.back_white}
            alt="back Icon"
            width={39}
            height={54}
          />
        ) : (
          <Image
            className={`${styles['header_search-bar_logo-box_icon']}`}
            src={ICON.back}
            alt="back Icon"
            width={39}
            height={54}
          />
        )
      ) : !isExhibition ? (
        <Image
          className={`${styles['header_search-bar_logo-box_icon']}`}
          src={ICON.eyes}
          alt="Eyes Icon"
          width={39}
          height={39}
        />
      ) : (
        <Image
          className={`${styles['header_search-bar_logo-box_icon']}`}
          src={ICON.eyes_white}
          alt="Eyes Icon"
          width={39}
          height={39}
        />
      )}
      {!isSearchOpen && !isSelectSheetOpen && (
        <span className={`${styles['header_search-bar_logo-box_title']}`}>
          눈 길
        </span>
      )}
    </div>
  )
}

// const RnPsearchBox: React.FC = () => {
//   return (
//     <div className={`${styles['header_search-focus-box']}`}>
//       <p className={`${styles['header_search-focus-box_title']}`}>
//         최근 검색어
//       </p>
//       <div className={`${styles['header_search-focus-box_recent-search-box']}`}>
//         <div
//           className={`${styles['header_search-focus-box_recent-search-box_recent-search']}`}
//         >
//           <span>데이식스</span>
//           <button type="button">X</button>
//         </div>

//         <div
//           className={`${styles['header_search-focus-box_recent-search-box_recent-search']}`}
//         >
//           <span>트와이스</span>
//           <button type="button">X</button>
//         </div>
//         <div
//           className={`${styles['header_search-focus-box_recent-search-box_recent-search']}`}
//         >
//           <span>세상에서 제일가는 포테이토 칩</span>
//           <button type="button">X</button>
//         </div>
//       </div>
//       <p className={`${styles['header_search-focus-box_title']}`}>
//         인기 검색어
//       </p>
//       <ol className={`${styles['header_search-focus-box_popular-list']}`}>
//         <li
//           className={`${styles['header_search-focus-box_popular-list_line']}`}
//         >
//           데이식스
//         </li>
//         <li
//           className={`${styles['header_search-focus-box_popular-list_line']}`}
//         >
//           트와이스
//         </li>
//         <li
//           className={`${styles['header_search-focus-box_popular-list_line']}`}
//         >
//           루피
//         </li>
//         <li
//           className={`${styles['header_search-focus-box_popular-list_line']}`}
//         >
//           데이식스
//         </li>
//         <li
//           className={`${styles['header_search-focus-box_popular-list_line']}`}
//         >
//           트와이스
//         </li>
//         <li
//           className={`${styles['header_search-focus-box_popular-list_line']}`}
//         >
//           루피
//         </li>
//       </ol>
//     </div>
//   )
// }

export { Header, LogoBox, SearchBox }
