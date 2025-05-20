'use client'

import { useCallback, useEffect, useState } from 'react'
import styles from './LocationPermissionModal.module.scss'

interface LocationPermissionModalProps {
  setIsModalOpen: (isOpen: boolean) => void
  getCurrentLocation: () => Promise<{ latitude: number; longitude: number }>
}

export const LocationPermissionModal = ({
  setIsModalOpen,
  getCurrentLocation,
}: LocationPermissionModalProps) => {
  const [isDenied, setIsDenied] = useState(false)

  useEffect(() => {
    // 초기 권한 상태 확인
    navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
      setIsDenied(permissionStatus.state === 'denied')
    })
  }, [])

  const handleAllow = useCallback(async () => {
    try {
      await getCurrentLocation()
      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to get location:', error)
      if (error instanceof GeolocationPositionError && error.code === error.PERMISSION_DENIED) {
        setIsDenied(true)
      }
    }
  }, [getCurrentLocation, setIsModalOpen])

  const handleDeny = useCallback(() => {
    setIsDenied(true)
    setIsModalOpen(false)
  }, [setIsModalOpen])

  return (
    <div className={`${styles['modal']}`}>
      <p className={`${styles['description']}`}>
        {isDenied ? (
          <>
            브라우저 설정에서 위치 권한을 허용해주세요. <br />
            설정 {'>'} 개인정보 및 보안 {'>'} 위치 정보
          </>
        ) : (
          <>
            눈길이 사용자의 <br />
            현재 위치를 사용하려고 합니다.
          </>
        )}
      </p>
      <div className={`${styles['button-box']}`}>
        <button
          className={`${styles['button']}`}
          onClick={handleDeny}
        >
          {isDenied ? '닫기' : '허용안함'}
        </button>
        {!isDenied && (
          <button
            className={`${styles['button']}`}
            onClick={handleAllow}
          >
            허용
          </button>
        )}
      </div>
    </div>
  )
} 