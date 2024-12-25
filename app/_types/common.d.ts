interface DisplayState {
  location: string // 현재 경로 정보
  headerState: 'normal' | 'searching' | 'searched' // 헤더 상태 (지정된 문자열 타입)
  isNavigationDisplay: boolean // 네비게이션 표시 여부

  setLocation: (value: string) => void // 경로를 설정하는 함수
  setHeaderState: (value: 'normal' | 'searching' | 'searched') => void // 헤더 상태를 설정하는 함수
  setIsNavigationDisplay: (value: boolean) => void // 네비게이션 표시 여부를 설정하는 함수
}

export { DisplayState }
