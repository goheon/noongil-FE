'use client'

import { useState, useEffect, useCallback } from 'react'

import { LocationPermissionModal } from './location-permission-modal/LocationPermissionModal'

import { useVhUnit } from '@/app/_lib'
import {
  useNaverMapSDK,
  useMapInitializer,
  useMarkerManager,
  useMapCenter,
} from '@/app/_utils/MapHooks'
import { useMapStore } from '@/app/_store/map/useMapStore'
import { useMapQuery } from './useMapQuery'

import { IEventInfo } from '../eventInfo/type'
import styles from './MapBox.module.scss'

export interface MapEventInfo extends IEventInfo {
  addrLttd: number
  addrLotd: number
}

export const MapBox: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const setMap = useMapStore((s) => s.setMap)
  const setIsListSheetShowing = useMapStore((s) => s.setIsListSheetShowing)
  const setIsSelectSheetShowing = useMapStore((s) => s.setIsSelectSheetShowing)
  const setIsSelectSheetOpen = useMapStore((s) => s.setIsSelectSheetOpen)
  const selectedEvent = useMapStore((s) => s.selectedEvent)
  const setSelectedEventInfo = useMapStore((s) => s.setSelectedEventInfo)

  // 내부높이 계산 훅
  useVhUnit()

  // 지도 인스턴스 할당
  const map = useNaverMapSDK({
    clientId: process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID || '',
    mapContainerId: 'map',
    center: { lat: 37.5665, lng: 126.978 },
    zoom: 15,
    background: '#f8f9fa',
  })

  // 지도 인스턴스를 전역 상태에 저장
  useEffect(() => {
    setMap(map)
  }, [map, setMap])

  // 지도 마운트 시 초기화 훅, 위치권한 핸들링
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

  // 마커 매니저 훅
  const { addMarker, markers, updateMarkerLabels } = useMarkerManager({ map })

  // 지도 중심좌표 반환 훅
  const monitoredCenter = useMapCenter(map)
  console.log(monitoredCenter)

  // 줌 레벨 변경 감지 후 라벨 마커 컨트롤
  useEffect(() => {
    if (!map) return

    const zoomListener = naver.maps.Event.addListener(
      map,
      'zoom_changed',
      () => {
        const currentZoom = map.getZoom()
        console.log('현재 줌 레벨:', currentZoom)
        updateMarkerLabels(currentZoom)
      },
    )

    return () => {
      naver.maps.Event.removeListener(zoomListener)
    }
  }, [map, updateMarkerLabels])

  // 이벤트 조회 쿼리 데이터
  const { data } = useMapQuery()

  // 테스트용 마커 추가
  useEffect(() => {
    if (!map || !data) return

    const { events } = data
    if (!events || events.length === 0) return

    const firstEvent = events[0]
    const initialPosition = new naver.maps.LatLng(
      firstEvent.addrLttd,
      firstEvent.addrLotd,
    )
    const bounds = new naver.maps.LatLngBounds(initialPosition, initialPosition)

    events.forEach((event: MapEventInfo) => {
      const position = new naver.maps.LatLng(event.addrLttd, event.addrLotd)

      addMarker({
        id: String(event.eventId),
        position: { lat: event.addrLttd, lng: event.addrLotd },
        title: event.eventNm,
        type: event.eventTypeCd === '10' ? 'popup' : 'exhibition',
        onClick: () => {
          // list bottomsheet showing false
          setIsListSheetShowing(false)
          // assign data to global state
          setSelectedEventInfo(event)
          // select bottomsheet showing true
          setIsSelectSheetShowing(true)
          // select bottomsheet open
          setIsSelectSheetOpen(true)
          // header back button
          // map center move
          //
          console.log(`${event.eventNm} 마커 클릭됨`)
        },
      })

      bounds.extend(position)
    })

    if (selectedEvent) {
      map.setCenter({
        lat: selectedEvent.addrLttd - 0.001,
        lng: selectedEvent.addrLotd,
      })
      map.setZoom(16, true)
    } else {
      map.fitBounds(bounds)
      map.panToBounds(
        bounds,
        {},
        {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        },
      )
    }

    setIsListSheetShowing(true)
  }, [addMarker, map, data, setIsListSheetShowing])

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
                return reject(
                  new Error('Geolocation is not supported by this browser.'),
                )
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
