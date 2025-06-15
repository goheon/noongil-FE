'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ICON } from '@/public'
import Image from 'next/image'

import { useMapStore } from '@/app/_store/map/useMapStore'
import { getCurrentLocation, moveMapCenter } from '@/app/_utils/MapHooks'
import { useSnackbar } from '@/app/_components/common/snackbar/useSnackbar'
import styles from './CurrentButton.module.scss'

interface CachedLocation {
  latitude: number
  longitude: number
  timestamp: number
}

const CACHE_DURATION = 60 * 1000 // 1분

const CurrentButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const map = useMapStore((state) => state.map)
  const isSearchOpen = useMapStore((state) => state.isSearchOpen)
  const { showSnackbar } = useSnackbar()
  const locationCache = useRef<CachedLocation | null>(null)

  const handleButtonClick = async () => {
    if (isLoading) return

    try {
      setIsLoading(true)

      // 캐시된 위치 정보 확인
      const now = Date.now()
      if (
        locationCache.current &&
        now - locationCache.current.timestamp < CACHE_DURATION
      ) {
        // 캐시된 위치 정보 사용
        const { latitude, longitude } = locationCache.current
        moveMapCenter(map, latitude, longitude)
        return
      }

      // 새로운 위치 정보 요청
      const { latitude, longitude } = await getCurrentLocation()

      // 위치 정보 캐싱
      locationCache.current = {
        latitude,
        longitude,
        timestamp: now,
      }

      moveMapCenter(map, latitude, longitude)
    } catch (error) {
      console.error('Failed to get current location:', error)
      showSnackbar({
        message:
          '위치 정보를 가져오는데 실패했습니다.\n잠시 후 다시 시도해주세요.',
        type: 'error',
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles['speed-dial']}>
      {!isSearchOpen && (
        <motion.button
          className={`${styles['speed-dial-btn']} ${styles['main']}`}
          onClick={handleButtonClick}
          whileTap={{ scale: 0.8 }}
          disabled={isLoading}
        >
          <Image
            src={ICON.target}
            alt="target Icon"
            width={30}
            height={30}
            className={isLoading ? styles['rotating'] : ''}
          />
        </motion.button>
      )}
    </div>
  )
}

export { CurrentButton }
