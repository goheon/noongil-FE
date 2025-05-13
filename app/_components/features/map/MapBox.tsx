'use client'
import { useState, useEffect } from 'react'

import { useNaverMapSDK, useVhUnit, config } from '@/app/_lib'

import styles from './MapBox.module.scss'

export const MapBox: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  useVhUnit()

  const clientId = config.NAVER_MAP_CLIENT_ID || 'null' // 네이버 클라우드 플랫폼에서 발급받은 클라이언트 ID
  const map = useNaverMapSDK({
    clientId,
    mapContainerId: 'map',
    center: { lat: 37.5665, lng: 126.978 }, // 서울 중심 좌표
    zoom: 10,
    background: '#ffffff',
  })

  useEffect(() => {
    if (map) {
      // 지도에 마커 추가
      new naver.maps.Marker({
        position: new naver.maps.LatLng(37.5665, 126.978),
        map,
      })
      setIsModalOpen(true) // 먼저 안내 모달 띄우기

      let lastZoom = map.getZoom()
      naver.maps.Event.addListener(map, 'zoom_changed', () => {
        const currentZoom = map.getZoom()

        // 너무 빠른 줌 변화 방지
        if (Math.abs(currentZoom - lastZoom) > 2) {
          map.setZoom(lastZoom + (currentZoom > lastZoom ? 2 : -2))
        } else {
          lastZoom = currentZoom
        }
      })

      let zooming = false
      naver.maps.Event.addListener(map, 'zoom_changed', () => {
        zooming = true
        setTimeout(() => (zooming = false), 500) // 0.5초 후 줌 상태 해제
      })

      naver.maps.Event.addListener(map, 'dragstart', () => {
        if (zooming) {
          map.setOptions({ draggable: false })
        }
      })

      naver.maps.Event.addListener(map, 'dragend', () => {
        map.setOptions({ draggable: true })
      })

      console.log(map.hasListener('dragend'))
    }
  }, [map])

  return (
    <div className={`${styles['map-box']}`}>
      <div id="map" className={`${styles['map-box_map']}`} />
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
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        console.log(`현재 위치: ${latitude}, ${longitude}`)
        setIsModalOpen(false) // 모달 닫기
      },
      (error) => {
        console.error('위치 정보를 가져올 수 없습니다:', error)
        setIsModalOpen(false)
      },
    )
  }

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
