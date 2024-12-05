// 네이버지도 SDK 초기화 인터페이스
export interface UseNaverMapOptions {
  clientId: string
  mapContainerId: string
  center: {
    lat: number
    lng: number
  }
  zoom?: number
}
