'use client'

import { motion } from 'framer-motion'
import { ICON } from '@/public'
import Image from 'next/image'

import styles from './CurrentButton.module.scss'

const CurrentButton = () => {
  const handleButtonClick = () => {}

  return (
    <div className={styles['speed-dial']}>
      <motion.button
        className={`${styles['speed-dial-btn']} ${styles['main']}`}
        onClick={() => handleButtonClick()}
        whileTap={{ scale: 0.8 }}
      >
        <Image src={ICON.target} alt="target Icon" width={30} height={30} />
      </motion.button>
    </div>
  )
}

export { CurrentButton }
