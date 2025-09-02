'use client'

import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import classNames from 'classnames/bind'

import styles from './SpeedDial.module.scss'

const cx = classNames.bind(styles)

const SpeedDial = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isSmall, setIsSmall] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 600 : false,
  )

  // 페이지 너비 감시
  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 600)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
    if (!open) return
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
      path = path + lists + '/' + category + queryString
    } else {
      path = path + category + queryString
    }

    router.push(path)
  }

  return (
    <div className={cx('speed-dial')}>
      {/* 메인 버튼 */}
      <motion.button
        className={cx('speed-dial-btn', 'main', {
          isSmall: isSmall,
        })}
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
      >
        {focused}
      </motion.button>

      {/* AnimatePresence로 exit 애니메이션 적용 */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={cx('speed-dial-actions', {
              isSmall: isSmall,
            })}
            initial={{ opacity: 0, scale: 1, x: 0 }}
            animate={{ opacity: 1, scale: 1, x: -25 }}
            exit={{ opacity: 0, scale: 1, x: 0 }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
          >
            {buttons.map((button) => (
              <motion.button
                key={button}
                className={cx('speed-dial-btn', {
                  isSmall: isSmall,
                })}
                onClick={() => handleButtonClick(button)}
                disabled={!open}
              >
                {button}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { SpeedDial }
