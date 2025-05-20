import styles from './MapBox.module.scss'

interface LocationModalProps {
  setIsModalOpen: () => void
  getCurrentLocation: () => Promise<{ latitude: number; longitude: number }>
}

export const LocationPermissionModal: React.FC<LocationModalProps> = ({
  setIsModalOpen,
  getCurrentLocation,
}) => {
  const handleGetLocation = async () => {
    try {
      await getCurrentLocation()
      setIsModalOpen()
    } catch (error) {
      console.error('위치 정보를 가져올 수 없습니다:', error)
      setIsModalOpen()
    }
  }

  return (
    <div className={`${styles['modal']}`}>
      <p className={`${styles['description']}`}>
        눈길이 사용자의 <br />
        현재 위치를 사용하려고 합니다.
      </p>
      <div className={`${styles['button-box']}`}>
        <button
          className={`${styles['button']}`}
          onClick={setIsModalOpen}
        >
          허용안함
        </button>
        <button
          className={`${styles['button']}`}
          onClick={handleGetLocation}
        >
          허용
        </button>
      </div>
    </div>
  )
} 