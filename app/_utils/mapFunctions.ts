import { useState, useEffect } from 'react'

// 위치권한 허용 여부 확인 함수
export const checkLocationPermission = async () => {
  const { state } = await navigator.permissions.query({
    name: 'geolocation',
  })

  if (state === 'granted') return true
  return false
}

// 현위치 조회 함수
export interface Position {
  latitude: number
  longitude: number
}

export const getCurrentLocation = async (): Promise<Position> => {
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
        timeout: 3000, // 최대 3초까지만 기다림
        maximumAge: 1000 * 60 * 1, // 1분 내의 캐시된 위치도 허용
      },
    )
  })
}

declare global {
  interface Window {
    naver: typeof naver
  }
}

type MapType = naver.maps.Map

interface UseMapInitializerProps {
  map: MapType | null
  checkLocationPermission: () => boolean | Promise<boolean>
}

// 지도 초기화 훅
export const useMapInitializer = ({
  map,
  checkLocationPermission,
}: UseMapInitializerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!map) return

    // 기본 마커 추가
    let marker: naver.maps.Marker | null = null
    try {
      marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.5665, 126.978),
        map,
      })
    } catch (error) {
      console.error('Failed to create marker:', error)
    }

    // 위치 권한 확인
    const initLocationPermission = async () => {
      const hasPermission = await checkLocationPermission()
      if (!hasPermission) {
        setIsModalOpen(true)
      }
    }

    initLocationPermission()

    // 줌 레벨 조정
    let lastZoom = map.getZoom()
    let zooming = false

    const onZoomChanged = () => {
      const currentZoom = map.getZoom()

      if (Math.abs(currentZoom - lastZoom) > 2) {
        map.setZoom(lastZoom + (currentZoom > lastZoom ? 2 : -2))
      } else {
        lastZoom = currentZoom
      }

      zooming = true
      setTimeout(() => {
        zooming = false
      }, 500)
    }

    const onDragStart = () => {
      if (zooming) {
        map.setOptions({ draggable: false })
      }
    }

    const onDragEnd = () => {
      map.setOptions({ draggable: true })
    }

    // 이벤트 리스너 등록
    const zoomListener = naver.maps.Event.addListener(map, 'zoom_changed', onZoomChanged)
    const dragStartListener = naver.maps.Event.addListener(map, 'dragstart', onDragStart)
    const dragEndListener = naver.maps.Event.addListener(map, 'dragend', onDragEnd)

    // 언마운트 시 리스너 제거
    return () => {
      naver.maps?.Event.removeListener(zoomListener)
      naver.maps?.Event.removeListener(dragStartListener)
      naver.maps?.Event.removeListener(dragEndListener)
      if (marker) marker.setMap(null)
    }
  }, [checkLocationPermission, map])

  return { isModalOpen }
}
  