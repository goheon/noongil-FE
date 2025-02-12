'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'

import { ICON } from '@/public'
import {
  HeaderProps,
  MainPageHeaderProps,
  MyPageHeaderProps,
  SearchBoxProps,
} from '@/app/_types'
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

  console.log(pathname)

  if (pathname === '/') {
    return (
      <div
        className={`${styles.header} ${isExhibition && `${styles.exhibition}`}`}
      >
        <MainPageHeader
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          isExhibition={isExhibition}
          inputRef={inputRef}
          handleSearchClick={handleSearchClick}
        />
      </div>
    )
  } else if (pathname.includes('/my')) {
    return (
      <div className={`${styles.header} ${styles.myHeader}`}>
        <MyPageHeader />
      </div>
    )
  } else if (
    pathname.startsWith('/lists/popup/') ||
    pathname.startsWith('lists/exhibition/')
  ) {
    return (
      <div className={`${styles.header} ${styles.myHeader}`}>
        상세페이지 헤더
      </div>
    )
  } else {
    return (
      <div
        className={`${styles.header} ${isExhibition && `${styles.exhibition}`}`}
      >
        <MainPageHeader
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          isExhibition={isExhibition}
          inputRef={inputRef}
          handleSearchClick={handleSearchClick}
        />
      </div>
    )
  }
}

// 메인페이지헤더
const MainPageHeader: React.FC<MainPageHeaderProps> = ({
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

// 마이페이지 헤더
const MyPageHeader = () => {
  const pathname = usePathname()
  const router = useRouter()

  let headerText = ''

  switch (pathname) {
    case '/my':
      headerText = '마이페이지'
      break

    case '/my/setting':
      headerText = '계정정보'
      break

    case '/my/interests':
      headerText = '내 관심사'
      break

    case '/my/favorites':
      headerText = '즐겨찾기 팝업 / 전시'
      break

    default:
      headerText = '마이페이지'
      break
  }

  return (
    <div className={`${styles['header_my']}`}>
      {pathname !== '/my' && (
        <Image
          className={`${styles['header_my_icon']}`}
          src={ICON.back_white}
          alt="back Icon"
          width={30}
          height={30}
          onClick={() => {
            router.back()
          }}
        />
      )}
      <div className={`${styles['header_my_text-box']}`}>
        <p className={`${styles['header_my_text-box_text']}`}>{headerText}</p>
      </div>
      {pathname === '/my' && (
        <Image
          className={`${styles['header_my_icon']} ${styles['header_my_icon_setting']}`}
          src={ICON.cogwheel}
          alt="Setting Icon"
          width={30}
          height={30}
          onClick={() => {
            router.push('/my/setting')
          }}
        />
      )}
    </div>
  )
}

// 검색창 인풋 박스
const SearchBox: React.FC<SearchBoxProps> = ({
  handleSearchClick,
  isExhibition,
  inputRef,
  isSearchOpen,
}) => {
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
        ref={inputRef}
        placeholder={isSearchOpen ? '장소, 테마를 검색해보세요.' : undefined}
      />
      <button
        className={`${styles['header_search-bar_search-box_button']}`}
        type="button"
        aria-label="Search"
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
const LogoBox: React.FC<MyPageHeaderProps> = ({
  isSearchOpen,
  setIsSearchOpen,
  isExhibition,
}) => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div
      className={`${styles['header_search-bar_logo-box']}`}
      onClick={() => {
        if (isSearchOpen) {
          setIsSearchOpen(false)
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
      {isSearchOpen ? (
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
      {!isSearchOpen && (
        <span className={`${styles['header_search-bar_logo-box_title']}`}>
          눈 길
        </span>
      )}
    </div>
  )
}

// 검색 포커스 최근, 인기 검색 목록 확장 박스 컴포넌트
const RnPsearchBox: React.FC = () => {
  return (
    <div className={`${styles['header_search-focus-box']}`}>
      <p className={`${styles['header_search-focus-box_title']}`}>
        최근 검색어
      </p>
      <div className={`${styles['header_search-focus-box_recent-search-box']}`}>
        <div
          className={`${styles['header_search-focus-box_recent-search-box_recent-search']}`}
        >
          <span>데이식스</span>
          <button type="button">X</button>
        </div>

        <div
          className={`${styles['header_search-focus-box_recent-search-box_recent-search']}`}
        >
          <span>트와이스</span>
          <button type="button">X</button>
        </div>
        <div
          className={`${styles['header_search-focus-box_recent-search-box_recent-search']}`}
        >
          <span>세상에서 제일가는 포테이토 칩</span>
          <button type="button">X</button>
        </div>
      </div>
      <p className={`${styles['header_search-focus-box_title']}`}>
        인기 검색어
      </p>
      <ol className={`${styles['header_search-focus-box_popular-list']}`}>
        <li
          className={`${styles['header_search-focus-box_popular-list_line']}`}
        >
          데이식스
        </li>
        <li
          className={`${styles['header_search-focus-box_popular-list_line']}`}
        >
          트와이스
        </li>
        <li
          className={`${styles['header_search-focus-box_popular-list_line']}`}
        >
          루피
        </li>
        <li
          className={`${styles['header_search-focus-box_popular-list_line']}`}
        >
          데이식스
        </li>
        <li
          className={`${styles['header_search-focus-box_popular-list_line']}`}
        >
          트와이스
        </li>
        <li
          className={`${styles['header_search-focus-box_popular-list_line']}`}
        >
          루피
        </li>
      </ol>
    </div>
  )
}

export { Header }
