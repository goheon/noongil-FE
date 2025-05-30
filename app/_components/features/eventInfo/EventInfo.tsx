import styles from './EventInfo.module.scss'
import classNames from 'classnames/bind'
import useEventInfo from './useEventInfo'
import Image from 'next/image'
import SampleImage from '@/public/free-img.jpg'
import { ICON } from '@/public'
import { useCallback, useMemo } from 'react'
import { formatDateRange } from '@/app/_utils/textFormatter'
import usePopularList from '../main/PopularList/usePopularList'
import SuggestionList from './SuggestionList'
import { isPastDate } from '@/app/_utils/date'
import useBookmarkItem from '../searchList/SearchList/useBookmarkItem'

const cx = classNames.bind(styles)

const heartIconMap: Record<string, any> = {
  '10': {
    liked: ICON.heart_black_active,
    unliked: ICON.heart_black,
  },
  '20': {
    liked: ICON.heart_black,
    unliked: ICON.heart_white,
  },
}

interface EventInfoProps {
  id: string
}

const EventInfo = (props: EventInfoProps) => {
  const { id } = props

  const { onBookmark } = useBookmarkItem()

  const { isLoading, eventDetail, nearEvents } = useEventInfo(id)

  const heartIcon = useMemo(() => {
    const state = eventDetail?.likeYn === 'Y' ? 'liked' : 'unliked'

    return heartIconMap[eventDetail?.eventTypeCd ?? '10'][state]
  }, [eventDetail])

  const eventDate = useMemo(
    () =>
      eventDetail
        ? formatDateRange(eventDetail.operStatDt, eventDetail.operEndDt)
        : null,
    [eventDetail],
  )

  const isExhibition = useMemo(
    () => eventDetail && eventDetail.eventTypeCd === '20',
    [eventDetail],
  )

  const isPast = useMemo(() => {
    return eventDetail?.operEndDt && isPastDate(eventDetail.operEndDt)
  }, [eventDetail])

  const { popularList } = usePopularList(isExhibition ? '20' : '10')

  const handleLike = useCallback(() => {
    if (!eventDetail) {
      return
    }

    onBookmark({
      eventId: eventDetail.eventId,
      likeYn: eventDetail.likeYn === 'Y' ? 'N' : 'Y',
    })
  }, [eventDetail])

  return (
    <div className={cx('container')}>
      <div className={cx('img-wrapper')}>
        <Image
          src={eventDetail?.imageUrl || SampleImage}
          width={430}
          height={567}
          alt="img"
        />
      </div>

      <div className={cx('info-box')}>
        <div className={cx('progress')}>{isPast ? '마감' : '진행 중'}</div>
        <div className={cx('info-top')}>
          <div className={cx('title')}>{eventDetail?.eventNm}</div>
          <div className={cx('option-box')}>
            <div className={cx('share')}>
              <Image
                className={cx('icon', { 'icon--exhibition': isExhibition })}
                src={ICON.share}
                alt="icon"
                width={20}
                height={20}
              />
            </div>
            <div
              className={cx('like', { 'like--exhibition': isExhibition })}
              onClick={handleLike}
            >
              <Image src={heartIcon} alt="icon" width={30} height={30} />
            </div>
          </div>
        </div>

        <div className={cx('info-middle')}>
          <div className={cx('infos')}>
            <Image
              className={cx('icon', { 'icon--exhibition': isExhibition })}
              src={ICON.calendar}
              width={20}
              height={20}
              alt="icon"
            />
            <div className={cx('info', 'info--date')}>{eventDate}</div>
          </div>
          <div className={cx('infos')}>
            <Image
              className={cx('icon', { 'icon--exhibition': isExhibition })}
              src={ICON.clock}
              width={20}
              height={20}
              alt="icon"
            />
            <div className={cx('info')}>{eventDetail?.operDttmCntn}</div>
          </div>
          <div className={cx('infos')}>
            <Image
              className={cx('icon', { 'icon--exhibition': isExhibition })}
              src={ICON.location}
              width={20}
              height={20}
              alt="icon"
            />
            <div className={cx('info')}>{eventDetail?.eventAddr}</div>
          </div>
          <div className={cx('infos')}>
            <Image
              className={cx('icon', { 'icon--exhibition': isExhibition })}
              src={ICON.website}
              width={20}
              height={20}
              alt="icon"
            />
            <div className={cx('info')}>이벤트 사이트 방문하기</div>
          </div>

          <div className={cx('hastags')}>
            <span>#팝업스토어</span>
            <span>#전시</span>{' '}
          </div>
        </div>
      </div>

      <div className={cx('intro-box')}>
        <div className={cx('intro')}>
          <div className={cx('intro-title')}>[이벤트 소개]</div>
          <div className={cx('intro-detail')}>{eventDetail?.eventCntn}</div>
        </div>

        <div className={cx('img-container')}></div>
      </div>

      <div className={cx('suggestion-box')}>
        <SuggestionList list={popularList} rank={true} />

        {nearEvents && nearEvents.length > 0 && (
          <div className={cx('suggestion')}>
            <div className={cx('suggestion-title')}>이벤트 BEST</div>
          </div>
        )}
      </div>
    </div>
  )
}
export default EventInfo
