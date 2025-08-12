import { useLayoutEffect, useEffect, useState, useRef } from 'react'
import { useMapStore } from './useMapStore'
import { useMapQuery } from '../../_components/features/map/useMapQuery'

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

  /** 추가: 초기/변경 시 호출될 콜백들 (선택) */
  onZoomInit?: (zoom: number) => void
  onZoomChange?: (zoom: number) => void
  onZoomThreshold?: (payload: { zoom: number; count: number }) => void

  /** 옵션 (선택) */
  zoomChangeThreshold?: number // 기본 5
  zoomDebounceMs?: number // 기본 500ms
  maxZoomStep?: number // 기본 2 (보정폭)
}

// ===== Location Related Functions =====
export const checkLocationPermission = async () => {
  const { state } = await navigator.permissions.query({
    name: 'geolocation',
  })
  return state === 'granted'
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
      (error) => reject(error),
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
    if (isLoaded.current) return

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

// ===== Map Event Handlers (훅 아님) =====
type MapEventHandlerOptions = {
  /** 최대 줌 스텝 보정 폭 (기본 2) */
  maxZoomStep?: number
  /** 줌 디바운스 ms (기본 500) */
  debounceMs?: number
  /** 줌 변경 횟수 임계치 (기본 5) */
  threshold?: number
  /** 줌 변경 시 호출 */
  onZoomChange?: (zoom: number) => void
  /** 임계치 도달 시 호출 */
  onZoomThreshold?: (payload: { zoom: number; count: number }) => void
}

const createMapEventHandlers = (
  map: MapType,
  zoomingRef: React.MutableRefObject<boolean>,
  lastZoomRef: React.MutableRefObject<number>,
  zoomCount: number,
  setZoomCount: (count: number) => void,
  opts?: MapEventHandlerOptions,
) => {
  const maxStep = opts?.maxZoomStep ?? 2
  const debounceMs = opts?.debounceMs ?? 500
  const threshold = opts?.threshold ?? 5
  const onZoomChange = opts?.onZoomChange
  const onZoomThreshold = opts?.onZoomThreshold

  let debounceTimer: number | null = null

  const onZoomChanged = () => {
    const currentZoom = map.getZoom()

    // 1) 급격 줌 보정
    if (Math.abs(currentZoom - lastZoomRef.current) > maxStep) {
      map.setZoom(
        lastZoomRef.current +
          (currentZoom > lastZoomRef.current ? maxStep : -maxStep),
      )
    } else {
      lastZoomRef.current = currentZoom
    }

    // 2) 줌 변경 카운트 및 임계치 체크

    setZoomCount((zoomCount += 1))
    onZoomChange?.(currentZoom)
    if (zoomCount >= threshold) {
      onZoomThreshold?.({ zoom: currentZoom, count: zoomCount })
    }

    // 3) 디바운싱 플래그
    zoomingRef.current = true
    if (debounceTimer) {
      window.clearTimeout(debounceTimer)
      debounceTimer = null
    }
    debounceTimer = window.setTimeout(() => {
      zoomingRef.current = false
      debounceTimer = null
    }, debounceMs)
  }

  const onDragStart = () => {
    if (zoomingRef.current) {
      map.setOptions({ draggable: false })
    }
  }

  const onDragEnd = () => {
    map.setOptions({ draggable: true })
  }

  return { onZoomChanged, onDragStart, onDragEnd }
}

// ===== Map Initializer Hook =====
export const useMapInitializer = ({
  map,
  checkLocationPermission,

  // 선택 콜백: 초기/변경/임계치
  onZoomInit,
  onZoomChange,
  onZoomThreshold,

  // 선택 옵션
  zoomChangeThreshold = 5,
  zoomDebounceMs = 500,
  maxZoomStep = 2,
}: UseMapInitializerProps & {
  onZoomInit?: (zoom: number) => void
  onZoomChange?: (zoom: number) => void
  onZoomThreshold?: (payload: { zoom: number; count: number }) => void
  zoomChangeThreshold?: number
  zoomDebounceMs?: number
  maxZoomStep?: number
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const markerRef = useRef<naver.maps.Marker | null>(null)
  const isInitialized = useRef(false)
  const zoomingRef = useRef(false)
  const lastZoomRef = useRef(0)
  const { dataUpdatedAt } = useMapQuery()
  const zoomCount = useMapStore((s) => s.zoomCount)
  const setZoomCount = useMapStore((s) => s.setZoomCount)

  useLayoutEffect(() => {
    if (!map || isInitialized.current) return

    // 위치 권한 확인 및 변경 감지
    const initLocationPermission = async () => {
      const hasPermission = await checkLocationPermission()
      if (!hasPermission) setIsModalOpen(true)

      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          permissionStatus.onchange = () => {
            if (permissionStatus.state === 'granted') setIsModalOpen(false)
            else if (permissionStatus.state === 'denied') setIsModalOpen(true)
          }
        })
    }

    initLocationPermission()

    // 초기 줌 세팅 + 초기 콜백
    lastZoomRef.current = map.getZoom()
    onZoomInit?.(lastZoomRef.current) // ← 초기 라벨 업데이트 등 여기에

    // 이벤트 핸들러 생성 및 등록 (단일화)
    const { onZoomChanged, onDragStart, onDragEnd } = createMapEventHandlers(
      map,
      zoomingRef,
      lastZoomRef,
      zoomCount,
      setZoomCount,
      {
        maxZoomStep,
        debounceMs: zoomDebounceMs,
        threshold: zoomChangeThreshold,
        onZoomChange, // ← 변경 시 라벨 업데이트 등
        onZoomThreshold, // ← 임계치 분기
      },
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

    // 클린업
    return () => {
      naver.maps?.Event.removeListener(zoomListener)
      naver.maps?.Event.removeListener(dragStartListener)
      naver.maps?.Event.removeListener(dragEndListener)
      if (markerRef.current) markerRef.current.setMap(null)
      isInitialized.current = false
    }
  }, [
    map,
    checkLocationPermission,
    onZoomInit,
    onZoomChange,
    onZoomThreshold,
    zoomChangeThreshold,
    zoomDebounceMs,
    maxZoomStep,
  ])

  useEffect(() => {
    setZoomCount(0)
  }, [dataUpdatedAt])

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
  return { lat: center.y, lng: center.x }
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

    // 초기 중심 좌표
    const initialCenter = map.getCenter()
    setCenter({ lat: initialCenter.y, lng: initialCenter.x })

    // 리스너
    const centerChangedListener = naver.maps.Event.addListener(
      map,
      'center_changed',
      () => {
        const newCenter = map.getCenter()
        setCenter({ lat: newCenter.y, lng: newCenter.x })
      },
    )

    return () => {
      naver.maps.Event.removeListener(centerChangedListener)
    }
  }, [map])

  return center
}
