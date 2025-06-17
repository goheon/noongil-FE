'use client'

import { useState } from 'react'
import Image from 'next/image'

import { BottomSheet } from '@/app/_components/common'
import { useMapStore } from '@/app/_store/map/useMapStore'

import { ICON } from '@/public'
import styles from './MapSelectBottomSheet.module.scss'

const MapSelectBottomSheet = () => {
  const [isSelectSheetOpen, setIsSelectSheetOpen] = useState(false)

  return (
    <BottomSheet
      type="map-list"
      isOpen={isSelectSheetOpen}
      setIsOpen={setIsSelectSheetOpen}
    >
      blank
    </BottomSheet>
  )
}

export { MapSelectBottomSheet }
