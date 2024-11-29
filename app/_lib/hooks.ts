import { useLayoutEffect, useState, useRef } from 'react'
import { UseNaverMapOptions } from '@/app/_types'

// 네이버 지도 부착 SDK 훅
export const useNaverMapSDK = ({
  clientId,
  mapContainerId,
  center,
  zoom = 10,
}: UseNaverMapOptions) => {
  const [map, setMap] = useState<naver.maps.Map | null>(null)
  const isLoaded = useRef(false)

  useLayoutEffect(() => {
    if (isLoaded.current) {
      // 이미 SDK가 로드된 경우 실행하지 않음
      return
    }

    // 네이버 지도 SDK 스크립트 동적 로드
    const script = document.createElement('script')
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`
    script.async = true

    script.onload = () => {
      if (window.naver) {
        const mapOptions: naver.maps.MapOptions = {
          center: new naver.maps.LatLng(center.lat, center.lng),
          zoom,
        }

        const naverMap = new naver.maps.Map(mapContainerId, mapOptions)
        setMap(naverMap)
      }
    }

    document.body.appendChild(script)

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.body.removeChild(script)
    }
  }, [clientId, mapContainerId])

  return map // 초기화된 네이버 지도 객체 반환
}
