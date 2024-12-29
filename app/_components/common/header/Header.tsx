import React from 'react'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'

import { useDisplayState } from '@/app/_lib'
import { ICON } from '@/public'
import { HeaderProps } from '@/app/_types'
import styles from './header.module.scss'

const Header: React.FC<HeaderProps> = ({ isExhibition }) => {
  const { location, headerState } = useDisplayState()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // 검색창 클릭 및 터치 핸들러 함수
  const handleSearchClick = () => {}

  return (
    <div className={styles.header}>
      <div className={`${styles['header_logo-box']}`}>
        {!isExhibition ? (
          <Image
            className={`${styles['header_logo-box_icon']}`}
            src={ICON.eyes}
            alt="Eyes Icon"
            width={39}
            height={39}
          />
        ) : (
          <Image
            className={`${styles['header_logo-box_icon']}`}
            src={ICON.eyes_white}
            alt="Eyes Icon"
            width={39}
            height={39}
          />
        )}
        <span className={`${styles['header_logo-box_title']}`}>눈 길</span>
      </div>
      <div className={`${styles['header_search-box']}`}>
        <input
          className={`${styles['header_search-box_input']} ${isExhibition && styles['header_search-box_input_exhibition']}`}
          type="text"
          name="search"
        />
        <button
          className={`${styles['header_search-box_button']}`}
          type="button"
          aria-label="Search"
        >
          <Image
            className={`${styles['header_search-box_icon']}`}
            src={ICON.search}
            alt="Search Icon"
            width={30}
            height={30}
          />
        </button>
      </div>
    </div>
  )
}

export { Header }
