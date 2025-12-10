import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useMapQuery } from '../../_components/features/map/useMapQuery'
import { useMapFilterStore } from './useMapFilterStore'
import { useMapStore } from './useMapStore'

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

// ===== Distance Calculation (Haversine formula) =====
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number => {
  const R = 6371 // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c // Distance in kilometers
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

// ===== Map Center Movement Tracking Hook =====
const MIN_ZOOM_FOR_LABELS = 15
const MIN_DISTANCE_FOR_REQUERY_KM = 1

export const useMapCenterMovement = (map: MapType | null) => {
  const labelRenderCenter = useMapStore((s) => s.labelRenderCenter)
  const setLabelRenderCenter = useMapStore((s) => s.setLabelRenderCenter)
  const setCurrentZoom = useMapStore((s) => s.setCurrentZoom)
  const setLocationFilter = useMapFilterStore((s) => s.setLocationFilter)
  const { dataUpdatedAt } = useMapQuery()

  // 데이터가 업데이트되면 기준점 초기화
  useEffect(() => {
    if (map) {
      const currentZoom = map.getZoom()
      if (currentZoom >= MIN_ZOOM_FOR_LABELS) {
        const center = map.getCenter()
        setLabelRenderCenter({ lat: center.y, lng: center.x })
      } else {
        setLabelRenderCenter(null)
      }
    }
  }, [dataUpdatedAt, map, setLabelRenderCenter])

  useEffect(() => {
    if (!map) return

    const handleZoomChanged = () => {
      const currentZoom = map.getZoom()
      const currentCenter = map.getCenter()

      // 현재 줌 레벨 상태 업데이트
      setCurrentZoom(currentZoom)

      if (currentZoom >= MIN_ZOOM_FOR_LABELS) {
        // 라벨 렌더링 조건 충족
        if (!labelRenderCenter) {
          // 최초 기준점 설정 (조건 3 - 데이터 재조회 로직 제거)
          setLabelRenderCenter({
            lat: currentCenter.y,
            lng: currentCenter.x,
          })
          // setLocationFilter(currentCenter.y, currentCenter.x)
        }
      } else {
        // 라벨 렌더링 조건 미충족 - 초기화
        setLabelRenderCenter(null)
      }
    }

    const handleCenterChanged = () => {
      const currentZoom = map.getZoom()
      const currentCenter = map.getCenter()
      const isProgrammaticMove = useMapStore.getState().isProgrammaticMove

      // 프로그래밍된 센터 이동인 경우 데이터 재조회하지 않음
      if (isProgrammaticMove) return

      if (currentZoom >= MIN_ZOOM_FOR_LABELS && labelRenderCenter) {
        // 라벨이 렌더링되는 상태에서 중심 이동 체크 (조건 1)
        const distance = calculateDistance(
          labelRenderCenter.lat,
          labelRenderCenter.lng,
          currentCenter.y,
          currentCenter.x,
        )

        if (distance >= MIN_DISTANCE_FOR_REQUERY_KM) {
          // 1km 이상 이동 시 위치 필터 업데이트 및 데이터 재조회
          setLocationFilter(currentCenter.y, currentCenter.x)
          // 새로운 기준점으로 업데이트
          setLabelRenderCenter({
            lat: currentCenter.y,
            lng: currentCenter.x,
          })
        }
      }
    }

    const zoomListener = naver.maps.Event.addListener(
      map,
      'zoom_changed',
      handleZoomChanged,
    )
    const centerListener = naver.maps.Event.addListener(
      map,
      'center_changed',
      handleCenterChanged,
    )

    // 초기 상태 설정
    handleZoomChanged()

    return () => {
      naver.maps.Event.removeListener(zoomListener)
      naver.maps.Event.removeListener(centerListener)
    }
  }, [
    map,
    labelRenderCenter,
    setLabelRenderCenter,
    setLocationFilter,
    setCurrentZoom,
  ])
}
