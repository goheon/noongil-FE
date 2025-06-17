'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useDragControls } from 'framer-motion'
import styles from './BottomSheet.module.scss'

export type BottomSheetType = 'filter' | 'map-list' | 'map-select'

interface BottomSheetProps {
  type: BottomSheetType
  children?: React.ReactNode
  /** 바텀시트의 열림 상태를 외부에서 제어할 수 있도록 하는 선택 prop */
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
  isExhibitionPage?: boolean
}

const BottomSheet = ({
  type,
  children,
  isOpen: isOpenProp,
  setIsOpen: setIsOpenProp,
  isExhibitionPage,
}: BottomSheetProps) => {
  // 내부 상태 초기값은 prop이 있으면 그 값, 없으면 false
  const [isOpen, setIsOpen] = useState<boolean>(isOpenProp ?? false)
  const dragControls = useDragControls()
  const bottomSheetRef = useRef(null)
  const [dragStartY, setDragStartY] = useState(0)

  // 외부 prop으로 전달된 isOpen 값이 바뀔 때 내부 상태도 업데이트
  useEffect(() => {
    if (typeof isOpenProp === 'boolean') {
      setIsOpen(isOpenProp)
    }
  }, [isOpenProp])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleDragStart = (e: any, info: any) => {
    setDragStartY(info.point.y)
  }

  const handleDragEnd = (e: any, info: any) => {
    const dragDistance = info.point.y - dragStartY

    if (dragDistance > 50) {
      setIsOpen(false)
      if (setIsOpenProp) {
        setIsOpenProp(false)
      }
    } else {
      setIsOpen(true)
      if (setIsOpenProp) {
        setIsOpenProp(true)
      }
    }
  }

  // type에 따라 다른 클래스명을 적용하거나 추가 UI를 렌더링할 수 있음.
  const bottomSheetClass = `${styles['bottom-sheet']} ${styles[`bottom-sheet--${type}`]} ${isExhibitionPage && styles['bottom-sheet--exhibition']}`

  // type에 따른 exit 위치와 드래그 범위 설정
  const getSheetConfig = () => {
    switch (type) {
      case 'map-list':
        return {
          animate: { y: isOpen ? '0%' : 175 },
          exitY: 150,
          dragConstraints: { top: 0, bottom: 0 },
        }
      default:
        return {
          animate: { y: isOpen ? '0%' : '100%' },
          exitY: '100%',
          dragConstraints: { top: 0, bottom: 0 },
        }
    }
  }

  const { animate, exitY, dragConstraints } = getSheetConfig()

  return (
    <div className={styles['bottom-sheet-container']}>
      {/* <motion.button
        className={styles['open-button']}
        onClick={handleToggle}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        바텀시트 열기
      </motion.button> */}

      <motion.div
        ref={bottomSheetRef}
        className={bottomSheetClass}
        initial={{ y: '100%' }}
        animate={animate}
        exit={{ y: exitY }}
        transition={{ type: 'spring', stiffness: 300, damping: 50 }}
        drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={dragConstraints}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <motion.div
          className={styles['handle-bar']}
          onPointerDown={(event) => dragControls.start(event)}
          style={{ touchAction: 'none' }}
        >
          <div className={styles['handle']} />
        </motion.div>

        <div
          className={`${styles['content']} ${type === 'filter' && `${styles['content--filter']}`}`}
        >
          {/* {type === 'filter' && (
            <div className={styles['header']}>
              <h3>필터 옵션</h3>
            </div>
          )} */}
          {/* {(type === 'map-list' || type === 'map-select') && (
            <div className={styles['header']}>
              <h3>{type === 'map-list' ? '지도 리스트' : '지도 선택'}</h3>
            </div>
          )} */}
          {children}
        </div>
      </motion.div>
    </div>
  )
}

export { BottomSheet }
