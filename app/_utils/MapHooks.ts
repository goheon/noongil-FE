import { useLayoutEffect, useEffect, useState, useRef, useCallback } from 'react'

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

type MarkerType = 'popup' | 'exhibition'

interface Marker {
  id: string
  position: {
    lat: number
    lng: number
  }
  title?: string
  isSelected?: boolean
  type: MarkerType
  onClick?: (marker: Marker) => void
}

interface MarkerInstance {
  id: string
  instance: naver.maps.Marker
  labelMarker?: naver.maps.Marker
  clickListener?: naver.maps.MapEventListener | null
  labelClickListener?: naver.maps.MapEventListener | null
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

interface UseMarkerManagerProps {
  map: MapType | null
}

interface MarkerWithLabel extends naver.maps.Marker {
  setLabel: (label: { text: string; color: string; fontSize: number; fontWeight: string; offsetY: number } | null) => void;
}

// ===== Constants =====
const LABEL_OFFSET = {
  NORMAL: 0.00015,    // 기본 줌 레벨에서의 오프셋
  HIGH_ZOOM: 0.00008  // 높은 줌 레벨에서의 오프셋
}
const MIN_ZOOM_FOR_LABELS = 15
const HIGH_ZOOM_LEVEL = 18

const createLabelStyle = () => {
  const content = (text: string) => `
    <div style="
      background: white;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 3px;
      font-size: 12px;
      text-align: center;
      white-space: nowrap;
    ">${text}</div>
  `

  const size = typeof window !== 'undefined' && window?.naver?.maps?.Size ? 
    new window.naver.maps.Size(100, 30) : 
    { width: 100, height: 30 }

  const anchor = typeof window !== 'undefined' && window?.naver?.maps?.Point ? 
    new window.naver.maps.Point(50, 15) : 
    { x: 50, y: 15 }

  return {
    content,
    size,
    anchor
  }
}

const LABEL_STYLE = createLabelStyle()

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
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}&submodules=geocoder`
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
  lastZoomRef: React.MutableRefObject<number>
) => {
  const onZoomChanged = () => {
    const currentZoom = map.getZoom()

    if (Math.abs(currentZoom - lastZoomRef.current) > 2) {
      map.setZoom(lastZoomRef.current + (currentZoom > lastZoomRef.current ? 2 : -2))
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

    // 위치 권한 확인
    const initLocationPermission = async () => {
      const hasPermission = await checkLocationPermission()
      if (!hasPermission) {
        setIsModalOpen(true)
      }
    }

    initLocationPermission()

    // 줌 레벨 초기화
    lastZoomRef.current = map.getZoom()

    // 이벤트 핸들러 생성 및 등록
    const { onZoomChanged, onDragStart, onDragEnd } = createMapEventHandlers(
      map,
      zoomingRef,
      lastZoomRef
    )
    const zoomListener = naver.maps.Event.addListener(map, 'zoom_changed', onZoomChanged)
    const dragStartListener = naver.maps.Event.addListener(map, 'dragstart', onDragStart)
    const dragEndListener = naver.maps.Event.addListener(map, 'dragend', onDragEnd)

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
export const moveMapCenter = (map: MapType | null, lat: number, lng: number) => {
  if (!map) return
  map.setCenter(new naver.maps.LatLng(lat, lng))
}

export const setMapZoom = (map: MapType | null, zoom: number) => {
  if (!map) return
  map.setZoom(zoom)
}

// ===== Marker Management Hook =====
export const useMarkerManager = ({ map }: UseMarkerManagerProps) => {
  const [markers, setMarkers] = useState<MarkerInstance[]>([])
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null)

  // 마커 아이콘 생성
  const createMarkerIcon = useCallback((type: MarkerType) => {
    const iconUrl = type === 'popup' ? '/icons/popup-marker.png' : '/icons/exhibition-marker.png'
    return {
      url: iconUrl,
      size: new naver.maps.Size(48, 48),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(24, 48),
    }
  }, [])

  // 마커 라벨 업데이트
  const updateMarkerLabels = useCallback((zoomLevel: number) => {
    if (!map) return

    const shouldShowLabel = zoomLevel >= MIN_ZOOM_FOR_LABELS
    const offset = zoomLevel >= HIGH_ZOOM_LEVEL ? LABEL_OFFSET.HIGH_ZOOM : LABEL_OFFSET.NORMAL

    setMarkers(prev => {
      // 변경이 필요한 경우에만 업데이트
      const hasChanges = prev.some(marker => 
        (shouldShowLabel && !marker.labelMarker?.getMap()) || 
        (!shouldShowLabel && marker.labelMarker?.getMap())
      )

      if (!hasChanges) return prev

      return prev.map(marker => {
        try {
          const position = marker.instance.getPosition()
          
          // 라벨 마커가 없는 경우 새로 생성
          if (!marker.labelMarker) {
            const labelMarker = new naver.maps.Marker({
              position: new naver.maps.LatLng(position.y + offset, position.x),
              map: shouldShowLabel ? map : undefined,
              icon: {
                content: LABEL_STYLE.content(marker.instance.getTitle() || ''),
                size: LABEL_STYLE.size,
                anchor: LABEL_STYLE.anchor
              }
            })
            marker.labelMarker = labelMarker
          } else {
            marker.labelMarker.setPosition(new naver.maps.LatLng(position.y, position.x))
            marker.labelMarker.setMap(shouldShowLabel ? map : null)
          }
        } catch (error) {
          console.error('Failed to update marker label:', error)
        }

        return marker
      })
    })
  }, [map])

  // 마커 추가
  const addMarker = useCallback((marker: Marker) => {
    if (!map) return

    try {
      const markerInstance = new naver.maps.Marker({
        position: new naver.maps.LatLng(marker.position.lat, marker.position.lng),
        map,
        icon: createMarkerIcon(marker.type),
        title: marker.title || ''
      })

      const currentZoom = map.getZoom()
      let clickListener: naver.maps.MapEventListener | null = null
      let labelClickListener: naver.maps.MapEventListener | null = null

      // 클릭 이벤트 핸들러 등록
      if (marker.onClick) {
        const handleClick = () => {
          // 현재 줌 레벨이 라벨이 보이는 레벨 이상일 때만 클릭 이벤트 실행
          if (map.getZoom() >= MIN_ZOOM_FOR_LABELS) {
            marker.onClick?.(marker)
          }
        }

        // 메인 마커 클릭 이벤트
        clickListener = naver.maps.Event.addListener(markerInstance, 'click', handleClick)
      }

      // 라벨 마커 생성
      const labelMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(marker.position.lat + LABEL_OFFSET.NORMAL, marker.position.lng),
        map: currentZoom >= MIN_ZOOM_FOR_LABELS ? map : undefined,
        icon: {
          content: LABEL_STYLE.content(marker.title || ''),
          size: LABEL_STYLE.size,
          anchor: LABEL_STYLE.anchor
        }
      })

      // 라벨 마커 클릭 이벤트
      if (marker.onClick) {
        labelClickListener = naver.maps.Event.addListener(labelMarker, 'click', () => {
          if (map.getZoom() >= MIN_ZOOM_FOR_LABELS) {
            marker.onClick?.(marker)
          }
        })
      }

      setMarkers(prev => [...prev, { 
        id: marker.id, 
        instance: markerInstance, 
        labelMarker,
        clickListener,
        labelClickListener // 라벨 클릭 리스너 참조 저장
      }])
    } catch (error) {
      console.error('Failed to add marker:', error)
    }
  }, [map, createMarkerIcon])

  // 마커 제거
  const removeMarker = useCallback((markerId: string) => {
    setMarkers((prev) => {
      const markerToRemove = prev.find((m) => m.id === markerId)
      if (markerToRemove) {
        markerToRemove.instance.setMap(null)
        markerToRemove.labelMarker?.setMap(null)
        // 클릭 리스너 제거
        if (markerToRemove.clickListener) {
          naver.maps.Event.removeListener(markerToRemove.clickListener)
        }
        if (markerToRemove.labelClickListener) {
          naver.maps.Event.removeListener(markerToRemove.labelClickListener)
        }
      }
      return prev.filter((m) => m.id !== markerId)
    })
  }, [])

  // 마커 초기화
  const clearMarkers = useCallback(() => {
    setMarkers((prev) => {
      prev.forEach((marker) => {
        marker.instance.setMap(null)
        marker.labelMarker?.setMap(null)
        // 클릭 리스너 제거
        if (marker.clickListener) {
          naver.maps.Event.removeListener(marker.clickListener)
        }
        if (marker.labelClickListener) {
          naver.maps.Event.removeListener(marker.labelClickListener)
        }
      })
      return []
    })
    setSelectedMarkerId(null)
  }, [])

  // 마커 선택
  const selectMarker = useCallback((markerId: string) => {
    if (!map) return
    setSelectedMarkerId(markerId)
  }, [map])

  // 마커 목록 일괄 업데이트
  const updateMarkers = useCallback((newMarkers: Marker[]) => {
    if (!map) return

    try {
      // 기존 마커 제거
      clearMarkers()

      const currentZoom = map.getZoom()

      // 새로운 마커 추가
      newMarkers.forEach(marker => {
        const markerInstance = new naver.maps.Marker({
          position: new naver.maps.LatLng(marker.position.lat, marker.position.lng),
          map,
          icon: createMarkerIcon(marker.type),
          title: marker.title || ''
        })

        // 라벨 마커 생성
        const labelMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(marker.position.lat + LABEL_OFFSET.NORMAL, marker.position.lng),
          map: currentZoom >= MIN_ZOOM_FOR_LABELS ? map : undefined,
          icon: {
            content: LABEL_STYLE.content(marker.title || ''),
            size: LABEL_STYLE.size,
            anchor: LABEL_STYLE.anchor
          }
        })

        setMarkers(prev => [...prev, { id: marker.id, instance: markerInstance, labelMarker }])
      })
    } catch (error) {
      console.error('Failed to update markers:', error)
    }
  }, [map, clearMarkers, createMarkerIcon])

  // 컴포넌트 언마운트 시 마커 정리
  useEffect(() => {
    return () => {
      clearMarkers()
    }
  }, [clearMarkers])

  return {
    markers,
    selectedMarkerId,
    addMarker,
    removeMarker,
    clearMarkers,
    selectMarker,
    updateMarkers,
    updateMarkerLabels,
  }
} 