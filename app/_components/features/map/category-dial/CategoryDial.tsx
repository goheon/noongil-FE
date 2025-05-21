'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { useMapFilterStore, EventType } from '@/app/_store/map/useMapFilterStore'
import { useMapStore } from '@/app/_store/map/useMapStore'

import styles from './CategoryDial.module.scss'

const CategoryDial = () => {
  const [open, setOpen] = useState(false)
  const { selectedType, setSelectedType } = useMapFilterStore()
  const isSearchOpen = useMapStore((state) => state.isSearchOpen)

  const { focused, buttons } = useMemo(() => {
    if (selectedType === 'POPUP') {
      return { focused: '팝업', buttons: ['전시', '전체'] }
    } else if (selectedType === 'EXHIBITION') {
      return { focused: '전시', buttons: ['팝업', '전체'] }
    } else {
      return { focused: '전체', buttons: ['팝업', '전시'] }
    }
  }, [selectedType])

  const handleButtonClick = (button: string) => {
    if (!open) return

    if (button === '팝업') {
      setSelectedType('POPUP')
      setOpen(false)
    } else if (button === '전시') {
      setSelectedType('EXHIBITION')
      setOpen(false)
    } else {
      setSelectedType('ALL')
      setOpen(false)
    }
  }

  return (
    <div className={styles['speed-dial']}>
      {/* 메인 버튼 */}
      {!isSearchOpen && (
        <motion.button
          className={`${styles['speed-dial-btn']} ${styles['main']}`}
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.8 }}
        >
          {focused}
        </motion.button>
      )}

      {/* AnimatePresence로 exit 애니메이션 적용 */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles['speed-dial-actions']}
            initial={{ opacity: 0, scale: 1, x: 0 }}
            animate={{ opacity: 1, scale: 1, x: -25 }}
            exit={{ opacity: 0, scale: 1, x: 0 }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
          >
            {buttons.map((button) => (
              <motion.button
                key={button}
                className={`${styles['speed-dial-btn']}`}
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

export { CategoryDial }
