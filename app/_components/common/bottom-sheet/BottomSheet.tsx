'use client'

import { useState, useRef, useEffect } from 'react'
import classNames from 'classnames/bind'
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

const cx = classNames.bind(styles)

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
  const [height, setHeight] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHeight(window.innerHeight)
    }
  }, [])

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
    } else if (dragDistance < 0) {
      setIsOpen(true)
      if (setIsOpenProp) {
        setIsOpenProp(true)
      }
    }
  }

  // type에 따른 exit 위치와 드래그 범위 설정
  const getSheetConfig = () => {
    const isShortHeightView = typeof height === 'number' && height < 741

    switch (type) {
      case 'map-list':
        return {
          animate: { y: isOpen ? 0 : '63dvh' },
          exitY: '63dvh',
          dragConstraints: { top: 0, bottom: 0 },
        }
      case 'map-select':
        return {
          animate: { y: isOpen ? 0 : isShortHeightView ? '35dvh' : '25dvh' },
          exitY: isShortHeightView ? '35dvh' : '25dvh',
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
    <div className={cx('bottom-sheet-container')}>
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
        className={cx(
          'bottom-sheet',
          `bottom-sheet--${type}`,
          isExhibitionPage && 'bottom-sheet--exhibition',
        )}
        initial={{ y: '100%' }}
        animate={animate}
        exit={{ y: exitY }}
        transition={{ type: 'spring', stiffness: 300, damping: 50 }}
        // drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={dragConstraints}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <motion.div
          className={cx('handle-bar')}
          onPointerDown={(event) => dragControls.start(event)}
          style={{ touchAction: 'none' }}
        >
          <div className={cx('handle')} />
        </motion.div>

        <div className={cx('content', type === 'filter' && 'content--filter')}>
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
