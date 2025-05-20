'use client'

import { useState, useEffect } from 'react'

import { useNaverMapSDK, config } from '@/app/_lib'
import {
  checkLocationPermission,
  getCurrentLocation,
  useMapInitializer,
} from '@/app/_utils/mapFunctions'

import { ICON } from '@/public'

import styles from './MapBox.module.scss'

export const MapBox: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const clientId = config.NAVER_MAP_CLIENT_ID || 'null'
  const map = useNaverMapSDK({
    clientId,
    mapContainerId: 'map',
    center: { lat: 37.5665, lng: 126.978 }, // 서울 중심
    zoom: 10,
    background: '#ffffff',
  })

  useMapInitializer({ map, checkLocationPermission })

  useEffect(() => {
    if (!map) return

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(37.5665, 126.975),
      map,
      icon: {
        url: ICON.marker_exhibition,
        size: new naver.maps.Size(37, 37),
        anchor: new naver.maps.Point(20, 40),
      },
    })

    naver.maps.Event.addListener(marker, 'click', (e) => {
      console.log('마커 클릭됨!', e)
      alert('마커 클릭')
    })
  }, [map])

  return (
    <div className={`${styles['map-box']}`}>
      <div
        id="map"
        className={`${styles['map-box_map']} ${styles['full-height']}`}
      />
      <LocationPermissionModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  )
}

interface LocationModalProps {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LocationPermissionModal: React.FC<LocationModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  return (
    <>
      {isModalOpen && (
        <div className={`${styles['modal']}`}>
          <p className={`${styles['description']}`}>
            눈길.co.kr이 사용자의 <br />
            현재 위치를 사용하려고 합니다.
          </p>
          <div className={`${styles['button-box']}`}>
            <button
              className={`${styles['button']}`}
              onClick={() => setIsModalOpen(false)}
            >
              허용안함
            </button>
            <button
              className={`${styles['button']}`}
              onClick={getCurrentLocation}
            >
              허용
            </button>
          </div>
        </div>
      )}
    </>
  )
}
