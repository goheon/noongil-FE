import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'

import { ICON } from '@/public'
import { HeaderProps } from '@/app/_types'
import styles from './header.module.scss'

// 헤더
// 검색창 활성화 시, 뒤로가기 아이콘 렌더링 안됨 이슈
const Header: React.FC<HeaderProps> = ({ isExhibition }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // 검색창 클릭 및 터치 핸들러 함수
  const handleSearchClick = () => {
    setIsSearchOpen(true)
    inputRef?.current?.focus()
  }

  return (
    <div
      className={`${styles.header} ${isExhibition && `${styles.exhibition}`}`}
    >
      <div className={`${styles['header_search-bar']}`}>
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
            <Image
              className={`${styles['header_search-bar_logo-box_icon']}`}
              src={ICON.back}
              alt="back Icon"
              width={39}
              height={54}
            />
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
        <div
          className={`${styles['header_search-bar_search-box']}`}
          onClick={() => handleSearchClick()}
        >
          <input
            className={`${styles['header_search-bar_search-box_input']} ${isExhibition && `${styles['header_search-bar_search-box_input_exhibition']}`}`}
            type="text"
            name="search"
            ref={inputRef}
            placeholder={
              isSearchOpen ? '장소, 테마를 검색해보세요.' : undefined
            }
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
      </div>
      {isSearchOpen && (
        <div className={`${styles['header_search-focus-box']}`}>
          <p className={`${styles['header_search-focus-box_title']}`}>
            최근 검색어
          </p>
          <div
            className={`${styles['header_search-focus-box_recent-search-box']}`}
          >
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
      )}
    </div>
  )
}

export { Header }
