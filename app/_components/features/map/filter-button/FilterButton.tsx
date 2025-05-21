'use client'

import { motion } from 'framer-motion'
import { ICON } from '@/public'
import Image from 'next/image'

import { useMapStore } from '@/app/_store/map/useMapStore'
import styles from './FilterButton.module.scss'

const FilterButton = () => {
  const handleButtonClick = () => {}
  const isSearchOpen = useMapStore((state) => state.isSearchOpen)

  return (
    <div className={styles['speed-dial']}>
      {!isSearchOpen && (
        <motion.button
          className={`${styles['speed-dial-btn']}`}
          onClick={() => handleButtonClick()}
          whileTap={{ scale: 0.8 }}
        >
          <Image src={ICON.filter} alt="filter Icon" width={30} height={30} />
        </motion.button>
      )}
    </div>
  )
}

export { FilterButton }
