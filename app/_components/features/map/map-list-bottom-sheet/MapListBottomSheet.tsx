'use client'

import { useState } from 'react'
import Image from 'next/image'

import { BottomSheet } from '@/app/_components/common'
import { useMapStore } from '@/app/_store/map/useMapStore'

import { ICON } from '@/public'
import styles from './MapListBottomSheet.module.scss'

const MapListBottomSheet = () => {
  const [isListSheetOpen, setIsListSheetOpen] = useState(false)

  return (
    <BottomSheet
      type="map-list"
      isOpen={isListSheetOpen}
      setIsOpen={setIsListSheetOpen}
    >
      blank
    </BottomSheet>
  )
}

export { MapListBottomSheet }
