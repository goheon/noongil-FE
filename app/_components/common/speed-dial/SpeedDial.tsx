'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'

import styles from './SpeedDial.module.scss'

const SpeedDial = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const { focused, buttons } = useMemo(() => {
    if (pathname.includes('popup')) {
      return { focused: '팝업', buttons: ['전시', '전체'] }
    } else if (pathname.includes('exhibition')) {
      return { focused: '전시', buttons: ['팝업', '전체'] }
    } else {
      return { focused: '전체', buttons: ['팝업', '전시'] }
    }
  }, [pathname])

  const handleButtonClick = (button: string) => {
    const currentQuery = new URLSearchParams(window.location.search).toString()

    let path = '/'
    let queryString = ''
    let category = ''
    let lists = ''

    if (currentQuery) queryString = `?${currentQuery}`
    if (pathname.includes('lists')) lists = 'lists'

    if (button === '팝업') {
      category = 'popup'
    } else if (button === '전시') {
      category = 'exhibition'
    }

    if (lists) {
      // lists가 있을 경우, path에 '/'를 추가
      path = path + lists + '/' + category + queryString
    } else {
      path = path + category + queryString
    }

    router.push(path)
  }

  return (
    <div className={`${styles['speed-dial']}`}>
      {/* 메인 버튼 */}
      <motion.button
        className={`${styles['speed-dial-btn']} ${styles['main']}`}
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
      >
        {focused}
      </motion.button>

      {/* 액션 버튼들 */}
      <motion.div
        className={`${styles['speed-dial-actions']}`}
        initial={{ opacity: 0, scale: 1, x: 0 }}
        animate={
          open
            ? { opacity: 1, scale: 1, x: -25 }
            : { opacity: 0, scale: 1, x: 0 }
        }
        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
      >
        {buttons.map((button) => (
          <motion.button
            key={button}
            className={`${styles['speed-dial-btn']}`}
            onClick={() => handleButtonClick(button)}
          >
            {button}
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

export { SpeedDial }
