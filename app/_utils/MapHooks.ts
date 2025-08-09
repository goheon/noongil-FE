import { useLayoutEffect, useEffect, useState, useRef } from 'react'

declare global {
  interface Window {
    naver: typeof naver
  }
}

export type MapType = naver.maps.Map

// ===== Types =====
interface Position {
  latitude: number
  longitude: number
}

interface UseNaverMapSDKProps {
  clientId: string
  mapContainerId: string
  center: { lat: number; lng: number }
  zoom: number
  background: string
}

interface UseMapInitializerProps {
  map: MapType | null
  checkLocationPermission: () => boolean | Promise<boolean>
}

// ===== Location Related Functions =====
export const checkLocationPermission = async () => {
  const { state } = await navigator.permissions.query({
    name: 'geolocation',
  })

  if (state === 'granted') return true
  return false
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
        timeout: 3000,
        maximumAge: 1000 * 60 * 1,
      },
    )
  })
}

// ===== Map SDK Hook =====
export const useNaverMapSDK = ({
  clientId,
  mapContainerId,
  center,
  zoom,
  background,
}: UseNaverMapSDKProps) => {
  const [map, setMap] = useState<MapType | null>(null)
  const isLoaded = useRef(false)

  useLayoutEffect(() => {
    if (isLoaded.current) {
      return
    }

    const script = document.createElement('script')
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}&submodules=geocoder`
    script.async = true

    script.onload = () => {
      if (window.naver) {
        const mapOptions: naver.maps.MapOptions = {
          center: new naver.maps.LatLng(center.lat, center.lng),
          zoom,
          tileTransition: true,
          background,
        }

        const naverMap = new naver.maps.Map(mapContainerId, mapOptions)
        setMap(naverMap)
        isLoaded.current = true
      }
    }

    document.body.appendChild(script)

    return () => {
      if (isLoaded.current) {
        document.body.removeChild(script)
        isLoaded.current = false
      }
    }
  }, [center.lat, center.lng, clientId, mapContainerId, zoom, background])

  return map
}

// ===== Map Event Handlers =====
const createMapEventHandlers = (
  map: MapType,
  zoomingRef: React.MutableRefObject<boolean>,
  lastZoomRef: React.MutableRefObject<number>,
) => {
  const onZoomChanged = () => {
    const currentZoom = map.getZoom()

    if (Math.abs(currentZoom - lastZoomRef.current) > 2) {
      map.setZoom(
        lastZoomRef.current + (currentZoom > lastZoomRef.current ? 2 : -2),
      )
    } else {
      lastZoomRef.current = currentZoom
    }

    zoomingRef.current = true
    setTimeout(() => {
      zoomingRef.current = false
    }, 500)
  }

  const onDragStart = () => {
    if (zoomingRef.current) {
      map.setOptions({ draggable: false })
    }
  }

  const onDragEnd = () => {
    map.setOptions({ draggable: true })
  }

  return {
    onZoomChanged,
    onDragStart,
    onDragEnd,
  }
}

// ===== Map Initializer Hook =====
export const useMapInitializer = ({
  map,
  checkLocationPermission,
}: UseMapInitializerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const markerRef = useRef<naver.maps.Marker | null>(null)
  const isInitialized = useRef(false)
  const zoomingRef = useRef(false)
  const lastZoomRef = useRef(0)

  useLayoutEffect(() => {
    if (!map || isInitialized.current) return

    // 위치 권한 확인 및 변경 감지
    const initLocationPermission = async () => {
      const hasPermission = await checkLocationPermission()
      if (!hasPermission) {
        setIsModalOpen(true)
      }

      // 권한 상태 변경 감지
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          permissionStatus.onchange = () => {
            if (permissionStatus.state === 'granted') {
              setIsModalOpen(false)
            } else if (permissionStatus.state === 'denied') {
              setIsModalOpen(true)
            }
          }
        })
    }

    initLocationPermission()

    // 줌 레벨 초기화
    lastZoomRef.current = map.getZoom()

    // 이벤트 핸들러 생성 및 등록
    const { onZoomChanged, onDragStart, onDragEnd } = createMapEventHandlers(
      map,
      zoomingRef,
      lastZoomRef,
    )
    const zoomListener = naver.maps.Event.addListener(
      map,
      'zoom_changed',
      onZoomChanged,
    )
    const dragStartListener = naver.maps.Event.addListener(
      map,
      'dragstart',
      onDragStart,
    )
    const dragEndListener = naver.maps.Event.addListener(
      map,
      'dragend',
      onDragEnd,
    )

    isInitialized.current = true

    // 언마운트 시 리스너 제거
    return () => {
      naver.maps?.Event.removeListener(zoomListener)
      naver.maps?.Event.removeListener(dragStartListener)
      naver.maps?.Event.removeListener(dragEndListener)
      if (markerRef.current) markerRef.current.setMap(null)
      isInitialized.current = false
    }
  }, [map, checkLocationPermission])

  return { isModalOpen }
}

// ===== Map Control Functions =====
export const moveMapCenter = (
  map: MapType | null,
  lat: number,
  lng: number,
) => {
  if (!map) return
  map.setCenter(new naver.maps.LatLng(lat, lng))
}

export const setMapZoom = (map: MapType | null, zoom: number) => {
  if (!map) return
  map.setZoom(zoom)
}

export const getCenter = (map: MapType | null) => {
  if (!map) return null
  const center = map.getCenter()
  return {
    lat: center.y,
    lng: center.x,
  }
}

// ===== Map Center Monitoring Hook =====
export const useMapCenter = (map: MapType | null) => {
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null,
  )

  useEffect(() => {
    if (!map) {
      setCenter(null)
      return
    }

    // 초기 중심 좌표 설정
    const initialCenter = map.getCenter()
    setCenter({
      lat: initialCenter.y,
      lng: initialCenter.x,
    })

    // 중심 이동 이벤트 리스너 등록
    const centerChangedListener = naver.maps.Event.addListener(
      map,
      'center_changed',
      () => {
        const newCenter = map.getCenter()
        setCenter({
          lat: newCenter.y,
          lng: newCenter.x,
        })
      },
    )

    // 클린업 함수
    return () => {
      naver.maps.Event.removeListener(centerChangedListener)
    }
  }, [map])

  return center
}
