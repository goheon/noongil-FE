'use client'

import { useMemo, useRef } from 'react'
import styles from './EventImageForm.module.scss'
import { useState } from 'react'
import Image from 'next/image'
import useEventImageFrom from './useEventImageForm'

interface EventImageFormProps {
  eventId: string
}

const EventImageForm: React.FC<EventImageFormProps> = (props) => {
  const { eventId } = props
  const {
    mainImage,
    contentImage,
    uploadMainImageMution,
    uploadContentImageMutation,
    deleteMainImageMutation,
    deleteContentImageMutation,
  } = useEventImageFrom(eventId)

  const hasMainImage = useMemo(
    () => mainImage && mainImage.length > 0,
    [mainImage],
  )

  const hasContentImage = useMemo(
    () => contentImage && contentImage.length > 0,
    [contentImage],
  )

  const [mainImageFile, setMainImageFile] = useState<File | null>(null)
  const [contentImageFile, setContentImageFile] = useState<FileList | null>(
    null,
  )

  const mainImageInputRef = useRef<HTMLInputElement>(null)
  const contentImageInputRef = useRef<HTMLInputElement>(null)

  const handleMainFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setMainImageFile(file)
  }

  const handleContentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files) {
      setContentImageFile(files)
    }
  }

  const uploadMainImage = () => {
    if (!mainImageFile) {
      return
    }

    uploadMainImageMution.mutate(
      { eventId, mainImage: mainImageFile },
      {
        onSuccess: () => {
          if (mainImageInputRef.current) {
            mainImageInputRef.current.value = '' // input 값 초기화
          }
        },
      },
    )
  }

  const uploadContentImage = () => {
    if (!contentImageFile) {
      return
    }

    uploadContentImageMutation.mutate(
      {
        eventId,
        contentImage: contentImageFile,
      },
      {
        onSuccess: () => {
          if (contentImageInputRef.current) {
            contentImageInputRef.current.value = ''
          }
        },
      },
    )
  }

  return (
    <div className={`${styles['container']}`}>
      <div className={`${styles['section']}`}>
        <div className={`${styles['title']}`}>메인 이미지</div>
        <div className={`${styles['option']}`}>
          <input
            type="file"
            onChange={handleMainFileChange}
            ref={mainImageInputRef}
            disabled={hasMainImage}
          />
          <button onClick={uploadMainImage} disabled={hasMainImage}>
            메인 이미지 추가하기
          </button>

          <button
            onClick={() =>
              deleteMainImageMutation.mutate(mainImage[0].fileDtlId)
            }
            disabled={!hasMainImage}
          >
            메인 이미지 삭제하기
          </button>
        </div>
        <div className={`${styles['content']}`}>
          {hasMainImage && (
            <div>
              <Image
                src={mainImage[0].fileUrl}
                alt="main"
                width={400}
                height={400}
              />
            </div>
          )}
        </div>
      </div>

      <div className={`${styles['section']}`}>
        <div className={`${styles['title']}`}>콘텐츠 이미지</div>
        <div className={`${styles['option']}`}>
          <input
            type="file"
            multiple
            onChange={handleContentFileChange}
            ref={contentImageInputRef}
          />
          <button onClick={uploadContentImage}>콘텐츠 이미지 추가하기</button>
        </div>

        <div className={`${styles['content']}`}>
          {hasContentImage &&
            contentImage.map((data: any) => (
              <div
                className={`${styles['image-container']}`}
                key={data.fileDtlId}
              >
                <Image
                  src={data.fileUrl}
                  width={200}
                  height={200}
                  alt="content"
                />

                <button
                  className={`${styles['delete-btn']}`}
                  onClick={() =>
                    deleteContentImageMutation.mutate(data.fileDtlId)
                  }
                >
                  해당 이미지 삭제하기
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default EventImageForm
