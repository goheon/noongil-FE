'use client'

import { useEffect, useState } from 'react'

import { LocationPermissionModal } from './location-permission-modal/LocationPermissionModal'

import {
  useMapCenter,
  useMapInitializer,
  useNaverMapSDK,
} from '@/app/_store/map/MapHooks'
import { useMapFilterStore } from '@/app/_store/map/useMapFilterStore'
import { useMarkerStore } from '@/app/_store/map/useMapMarkerStore'
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
  const isSelectSheetShowing = useMapStore((s) => s.isSelectSheetShowing)
  const setIsSelectSheetShowing = useMapStore((s) => s.setIsSelectSheetShowing)
  const setIsSelectSheetOpen = useMapStore((s) => s.setIsSelectSheetOpen)
  const selectedEvent = useMapStore((s) => s.selectedEvent)
  const setSelectedEventInfo = useMapStore((s) => s.setSelectedEventInfo)
  const setIsFilterOpen = useMapStore((s) => s.setIsFilterOpen)
  const page = useMapFilterStore((s) => s.page)
  // 이벤트 조회 쿼리 데이터
  const { data } = useMapQuery()
  // console.log(data)

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
    // map store
    setMap(map)
    // marker store
    useMarkerStore.getState().setMap(map)

    return () => {
      useMarkerStore.getState().clearAll()
      useMarkerStore.getState().setMap(null)
    }
  }, [map, setMap])

  const updateLabels = useMarkerStore((s) => s.updateLabels)

  // 지도 마운트 시 초기화 훅, 위치권한 핸들링
  const { isModalOpen: permissionModalOpen } = useMapInitializer({
    map,
    checkLocationPermission: async () => {
      const { state } = await navigator.permissions.query({
        name: 'geolocation',
      })
      return state === 'granted'
    },
    // 마운트 후 초기 줌 레벨에 맞춰 라벨 초기화
    onZoomInit: (zoom) => {
      updateLabels(zoom)
    },
    // 줌할 때마다 라벨/상태 갱신
    onZoomChange: (zoom) => {
      updateLabels(zoom)
      // console.log('현재 줌 레벨:', zoom)
    },
    // 줌이 N회 이상 변경되면 분기
    onZoomThreshold: ({ zoom, count }) => {
      // 임계치 도달 시 처리 (필요시 추가)
    },
    zoomChangeThreshold: 5, // 기본 5
    zoomDebounceMs: 500, // 기본 500ms
    maxZoomStep: 2, // 기본 2
  })

  // permissionModalOpen 값이 변경될 때 isModalOpen 상태 업데이트
  useEffect(() => {
    setIsModalOpen(permissionModalOpen)
  }, [permissionModalOpen])

  // 지도 중심좌표 반환 훅
  const monitoredCenter = useMapCenter(map)

  // 3) 반응형 라벨 사이즈(모바일/데스크톱)
  useEffect(() => {
    const apply = () =>
      useMarkerStore.getState().setCompact(window.innerWidth < 940)
    apply()
    const onResize = () => apply()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // 뒤로가기 이벤트 핸들러
  // 뒤로가기 시 필터 열림 상태 강제 닫기
  useEffect(() => {
    const handlePopState = () => {
      setIsFilterOpen(false)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [setIsFilterOpen])

  // 마커 매니저 훅
  const addMarker = useMarkerStore((s) => s.addOne)
  const clearMarkers = useMarkerStore((s) => s.clearAll)
  const isInitialDataLoaded = useMapStore((s) => s.isInitialDataLoaded)
  const setIsInitialDataLoaded = useMapStore((s) => s.setIsInitialDataLoaded)

  // 테스트용 마커 추가
  useEffect(() => {
    if (!map || !data) return
    clearMarkers()

    const { events } = data
    if (!events || events.length === 0) return

    // 최초 로드 시에만 바운더리 기반 센터 이동 로직 적용
    const isFirstLoad = !isInitialDataLoaded

    let firstEvent: MapEventInfo | null = null
    let initialPosition: naver.maps.LatLng | null = null
    let bounds: naver.maps.LatLngBounds | null = null

    if (isFirstLoad) {
      firstEvent = events[0] as MapEventInfo
      initialPosition = new naver.maps.LatLng(
        firstEvent.addrLttd,
        firstEvent.addrLotd,
      )
      bounds = new naver.maps.LatLngBounds(initialPosition, initialPosition)
    }

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
          // console.log(`${event.eventNm} 마커 클릭됨`)
        },
      })

      // 최초 로드 시에만 바운더리 확장
      if (isFirstLoad && bounds) {
        bounds.extend(position)
      }
    })

    // 최초 로드 시에만 바운더리 기반 센터 이동
    if (isFirstLoad && bounds) {
      if (selectedEvent) {
        map.setCenter({
          lat: selectedEvent.addrLttd - 0.001,
          lng: selectedEvent.addrLotd,
        })
        map.setZoom(16, true)
      } else {
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

      // 최초 로드 완료 표시
      setIsInitialDataLoaded(true)
    }

    // selectedEvent가 선택되어 있으면 (선택 바텀시트가 열려 있으면) 리스트 바텀시트를 보이지 않음
    if (!selectedEvent) {
      setIsListSheetShowing(true)
    }
  }, [
    addMarker,
    clearMarkers,
    map,
    data,
    setIsListSheetShowing,
    selectedEvent,
    setSelectedEventInfo,
    setIsSelectSheetShowing,
    setIsSelectSheetOpen,
    isInitialDataLoaded,
    setIsInitialDataLoaded,
  ])

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
