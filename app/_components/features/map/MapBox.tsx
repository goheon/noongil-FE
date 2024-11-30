'use client'
import { useEffect } from 'react'

import { useNaverMapSDK } from '@/app/_lib'

import styles from './MapBox.module.scss'

export const MapBox: React.FC = () => {
  const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID || 'null' // 네이버 클라우드 플랫폼에서 발급받은 클라이언트 ID
  const map = useNaverMapSDK({
    clientId,
    mapContainerId: 'map',
    center: { lat: 37.5665, lng: 126.978 }, // 서울 중심 좌표
    zoom: 10,
  })

  useEffect(() => {
    if (map) {
      // 지도에 마커 추가
      new naver.maps.Marker({
        position: new naver.maps.LatLng(37.5665, 126.978),
        map,
      })
    }
  }, [map])

  return (
    <div className={`${styles['map-box']}`}>
      <div id="map" className={`${styles['map-box__map']}`} />
    </div>
  )
}
