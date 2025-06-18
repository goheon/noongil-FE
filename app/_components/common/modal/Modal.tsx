import React from 'react'
import styles from './Modal.module.scss'

type ModalProps = {
  isOpen: boolean
  title?: string
  message: string
  onOk: () => void
  onCancel?: () => void
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  onOk,
  onCancel,
}) => {
  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonGroup}>
          {onCancel && (
            <button className={styles.cancelButton} onClick={onCancel}>
              취소
            </button>
          )}
          <button className={styles.okButton} onClick={onOk}>
            확인
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
