'use client'

import styles from './RecommendList.module.scss'
import classNames from 'classnames/bind'
import { Chip } from '@/app/_components/ui'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getUserRecommendList } from '../mainApi'
import { TEventCodeName } from '@/app/_types'
import { ALL_EVENT_CODE_MAP } from '@/app/_constants/event'
import useUserAuth from '../../my/useUserAuth'
import RecommendListView from './RecommendListView'

const cx = classNames.bind(styles)

const TEXT_MAP = {
  all: '컨텐츠',
  popup: '팝업',
  exhibition: '전시',
}

interface RecommendListProps {
  eventCode: TEventCodeName
}

const RecommendList = (props: RecommendListProps) => {
  const { eventCode } = props

  const currentEventCode = ALL_EVENT_CODE_MAP[eventCode]

  const router = useRouter()

  const { isLoggedIn } = useUserAuth()

  const { data } = useQuery({
    queryKey: ['user-recommend-list', currentEventCode],
    queryFn: () => getUserRecommendList(currentEventCode),
    enabled: isLoggedIn,
  })

  const handleChipClick = () => {
    router.push(isLoggedIn ? '/my/categories' : '/login')
  }

  const hasData = data && data.all.length > 0

  return (
    <div className={cx('container')}>
      <div className={cx('top-section')}>
        <div className={cx('title')}>
          당신에게 딱 맞는 {TEXT_MAP[eventCode]}
        </div>
      </div>

      {hasData ? (
        <RecommendListView data={data} eventCode={eventCode} />
      ) : (
        <div className={cx('info-section')}>
          {!isLoggedIn && (
            <div className={cx('headline')}>로그인이 필요해요</div>
          )}
          <div className={cx('subline')}>
            당신에게 딱 맞는 {TEXT_MAP[eventCode]}
            {eventCode === 'popup' ? '이' : '가'} 기다리고 있어요
          </div>
          <Chip className={cx('login-chip')} onClick={handleChipClick}>
            {isLoggedIn ? '찾으러 가기' : '로그인'}
          </Chip>
        </div>
      )}
    </div>
  )
}

export default RecommendList
