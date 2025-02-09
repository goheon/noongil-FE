'use client'

import {
  IEventDetail,
  EVENT_OPTION_VALUES,
  POPUP_OPTION_VALUES,
  POPUP_CATEGORY_LABELS,
  EXHIBITION_OPTION_VALUES,
  EXHIBITION_CATEGORY_LABELS,
} from '../type'
import { useForm } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import useEventBaseForm from './useEventBaseForm'
import styles from './EventBaseForm.module.scss'
import DateForm from './DateForm/DateForm'

interface EventBaseFormProps {
  eventId?: string
}

const EventBaseForm: React.FC<EventBaseFormProps> = (props) => {
  const { eventId } = props

  const { initialValues, onSubmit, onDelete } = useEventBaseForm(eventId)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<IEventDetail>({ defaultValues: initialValues })

  useEffect(() => {
    if (eventId) {
      reset(initialValues)
    }
  }, [eventId, initialValues])

  const currentEvent = watch('ppstEnbnTypeCd')

  const CATERGORY = useMemo(
    () =>
      currentEvent === 'ENBN' ? EXHIBITION_OPTION_VALUES : POPUP_OPTION_VALUES,
    [currentEvent],
  )

  const CATERGORY_LABEL = useMemo(() => {
    return currentEvent === 'ENBN'
      ? (EXHIBITION_CATEGORY_LABELS as Record<string, string>)
      : (POPUP_CATEGORY_LABELS as Record<string, string>)
  }, [currentEvent])

  return (
    <form
      className={`${styles['container']}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={`${styles['header']}`}>
        {eventId && onDelete && (
          <button
            className={`${styles['option-btn']}`}
            type="button"
            onClick={onDelete}
          >
            삭제
          </button>
        )}

        <button className={`${styles['option-btn']}`} type="submit">
          저장
        </button>
      </div>

      <div className={`${styles['info-wrapper']}`}>
        <div className={`${styles['main-info']}`}>
          <div className={`${styles['section']}`}>
            <div className={`${styles['content']}`}>
              <div className={`${styles['title']}`}>팝업/전시구분</div>
              <div className={`${styles['data']}`}>
                <select {...register('ppstEnbnTypeCd')}>
                  {EVENT_OPTION_VALUES.map((value) => (
                    <option key={value} value={value}>
                      {value === 'ENBN' ? '전시' : '팝업'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={`${styles['content']}`}>
              <div className={`${styles['title']}`}>카테고리</div>
              <div className={`${styles['data']}`}>
                <select {...register('ctgyId')}>
                  {CATERGORY.map((value) => (
                    <option key={value} value={value}>
                      {CATERGORY_LABEL[value]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={`${styles['section']}`}>
            <div className={`${styles['content']}`}>
              <div className={`${styles['title']}`}>이벤트명</div>
              <div className={`${styles['data']}`}>
                <input {...register('eventNm')} />
              </div>
            </div>
            <div className={`${styles['content']}`}>
              <div className={`${styles['title']}`}>이벤트 주소</div>
              <div className={`${styles['data']}`}>
                <input {...register('eventAddr')} />
              </div>
            </div>
          </div>

          <div className={`${styles['section']}`}>
            <div className={`${styles['content']}`}>
              <div className={`${styles['title']}`}>이벤트 시작일</div>
              <div className={`${styles['data']}`}>
                <DateForm control={control} fieldName="operStatDt" />
              </div>
            </div>
            <div className={`${styles['content']}`}>
              <div className={`${styles['title']}`}>이벤트 종료일</div>
              <div className={`${styles['data']}`}>
                <DateForm control={control} fieldName="operEndDt" />
              </div>
            </div>
          </div>

          <div className={`${styles['section']}`}>
            <div className={`${styles['content']}`}>
              <div className={`${styles['title']}`}>운영시간 내용</div>
              <div className={`${styles['data']}`}>
                <textarea {...register('operDttmCntn')} />
              </div>
            </div>
          </div>

          <div className={`${styles['section']}`}>
            <div className={`${styles['content']}`}>
              <div className={`${styles['title']}`}>위도</div>
              <div className={`${styles['data']}`}>
                <input type="number" step="any" {...register('addrLttd')} />
              </div>
            </div>
            <div className={`${styles['content']}`}>
              <div className={`${styles['title']}`}>경도</div>
              <div className={`${styles['data']}`}>
                <input type="number" step="any" {...register('addrLotd')} />
              </div>
            </div>
          </div>

          <div className={`${styles['section']}`}>
            <div className={`${styles['content']}`}>
              <div className={`${styles['title']}`}>이벤트 내용</div>
              <div className={`${styles['data']}`}>
                <textarea {...register('eventCntn')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default EventBaseForm
