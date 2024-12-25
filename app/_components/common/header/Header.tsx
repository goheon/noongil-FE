import React from 'react'
import Image from 'next/image'

import { useDisplayState } from '@/app/_lib'
import { ICON } from '@/public'
import styles from './header.module.scss'

const Header: React.FC = () => {
  const { location, headerState } = useDisplayState()

  return (
    <div className={styles.header}>
      <div className={`${styles['header_logo-box']}`}>
        <Image
          className={`${styles['header_logo-box_icon']}`}
          src={ICON.eyes}
          alt="Eyes Icon"
          width={39}
          height={39}
        />
        <span className={`${styles['header_logo-box_title']}`}>눈 길</span>
      </div>
      <div className={`${styles['header_search-box']}`}>
        <input
          className={`${styles['header_search-box_input']}`}
          type="text"
          name="search"
        />
        <Image
          className={`${styles['header_search-box_icon']}`}
          src={ICON.search}
          alt="Search Icon"
          width={30}
          height={30}
        />
      </div>
    </div>
  )
}

export { Header }
