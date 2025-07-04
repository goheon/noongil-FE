'use client'

import { useState, useEffect, useCallback } from 'react'

import { useVhUnit, config } from '@/app/_lib'
import { useNaverMapSDK, useMapInitializer, useMarkerManager } from '@/app/_utils/MapHooks'
import { useMapStore } from '@/app/_store/map/useMapStore'

import styles from './MapBox.module.scss'
import { LocationPermissionModal } from './LocationPermissionModal'

export const MapBox: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const setMap = useMapStore((state) => state.setMap)
  useVhUnit()

  const clientId = config.NAVER_MAP_CLIENT_ID || 'null'
  const map = useNaverMapSDK({
    clientId: process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID || '',
    mapContainerId: 'map',
    center: { lat: 37.5665, lng: 126.9780 },
    zoom: 15,
    background: '#f8f9fa',
  })

  const {
    addMarker,
    markers,
    updateMarkerLabels,
  } = useMarkerManager({ map })

  // 지도 인스턴스를 전역 상태에 저장
  useEffect(() => {
    setMap(map)
  }, [map, setMap])

  // 줌 레벨 변경 감지
  useEffect(() => {
    if (!map) return

    const zoomListener = naver.maps.Event.addListener(map, 'zoom_changed', () => {
      const currentZoom = map.getZoom()
      console.log('현재 줌 레벨:', currentZoom)
      updateMarkerLabels(currentZoom)
    })

    return () => {
      naver.maps.Event.removeListener(zoomListener)
    }
  }, [map, updateMarkerLabels])

  const { isModalOpen: permissionModalOpen } = useMapInitializer({
    map,
    checkLocationPermission: async () => {
      const { state } = await navigator.permissions.query({
        name: 'geolocation',
      })
      return state === 'granted'
    },
  })

  // permissionModalOpen 값이 변경될 때 isModalOpen 상태 업데이트
  useEffect(() => {
    setIsModalOpen(permissionModalOpen)
  }, [permissionModalOpen])

  // 테스트용 마커 추가
  useEffect(() => {
    if (!map) return

    // 팝업 마커 추가 (3초 후)
    const popupTimer = setTimeout(() => {
      addMarker({
        id: 'popup1',
        position: { lat: 37.5665, lng: 126.978 },
        title: '서울시청 팝업스토어',
        type: 'popup',
        onClick: () => {
          console.log('팝업 마커 클릭됨')
        },
      })
      addMarker({
        id: 'popup2',
        position: { lat: 37.5645, lng: 126.975 },
        title: '광화문 팝업스토어',
        type: 'popup',
        onClick: () => {
          console.log('광화문 팝업 마커 클릭됨')
        },
      })
    }, 3000)

    // 전시 마커 추가 (6초 후)
    const exhibitionTimer = setTimeout(() => {
      addMarker({
        id: 'exhibition1',
        position: { lat: 37.5685, lng: 126.981 },
        title: '덕수궁 전시회',
        type: 'exhibition',
        onClick: () => {
          console.log('덕수궁 전시회 마커 클릭됨')
        },
      })
      addMarker({
        id: 'exhibition2',
        position: { lat: 37.5625, lng: 126.973 },
        title: '경복궁 전시회',
        type: 'exhibition',
        onClick: () => {
          console.log('경복궁 전시회 마커 클릭됨')
        },
      })
    }, 6000)

    return () => {
      clearTimeout(popupTimer)
      clearTimeout(exhibitionTimer)
    }
  }, [map, addMarker])

  return (
    <div className={`${styles['map-box']}`}>
      <div
        id="map"
        className={`${styles['map-box_map']} ${styles['full-height']}`}
      />
      {isModalOpen && (
        <LocationPermissionModal
          setIsModalOpen={setIsModalOpen}
          getCurrentLocation={async () => {
            return new Promise((resolve, reject) => {
              if (!navigator.geolocation) {
                return reject(new Error('Geolocation is not supported by this browser.'))
              }

              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords
                  resolve({ latitude, longitude })
                },
                (error) => {
                  reject(error)
                },
                {
                  enableHighAccuracy: false,
                  timeout: 3000,
                  maximumAge: 1000 * 60 * 1,
                },
              )
            })
          }}
        />
      )}
    </div>
  )
}
