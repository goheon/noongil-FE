'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ICON } from '@/public'
import Image from 'next/image'

import {
  checkLocationPermission,
  getCurrentLocation,
} from '@/app/_utils/mapFunctions'

import { Position } from '@/app/_utils/mapFunctions'
import styles from './CurrentButton.module.scss'

const CurrentButton = () => {
  const [pos, setPos] = useState<Position>({
    latitude: 37.5665,
    longitude: 126.978,
  })

  const handleButtonClick = async () => {
    console.log('clicked')

    try {
      const loc = await getCurrentLocation()
      if (loc) {
        console.log(loc)
        setPos(loc)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles['speed-dial']}>
      <motion.button
        className={`${styles['speed-dial-btn']} ${styles['main']}`}
        onClick={handleButtonClick}
        whileTap={{ scale: 0.8 }}
      >
        <Image src={ICON.target} alt="target Icon" width={30} height={30} />
      </motion.button>
    </div>
  )
}

export { CurrentButton }
