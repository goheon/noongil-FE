import { useMapFilterStore } from '@/app/_store/map/useMapFilterStore'
import { useMapStore } from '@/app/_store/map/useMapStore'
import classNames from 'classnames/bind'
import { useMapQuery } from '../useMapQuery'

import styles from './LoadMoreButton.module.scss'

const cx = classNames.bind(styles)

const LoadMoreButton = () => {
  const { data } = useMapQuery()
  const map = useMapStore((s) => s.map)
  const page = useMapFilterStore((s) => s.page)
  const setPage = useMapFilterStore((s) => s.setPage)
  const setIsLoadmoreShowing = useMapStore((s) => s.setIsLoadmoreShowing)
  const setLabelRenderCenter = useMapStore((s) => s.setLabelRenderCenter)

  const handleClick = () => {
    setPage(page + 1)
    setIsLoadmoreShowing(false)

    // 현재 중심을 새로운 기준점으로 설정
    if (map) {
      const center = map.getCenter()
      setLabelRenderCenter({ lat: center.y, lng: center.x })
    }
  }

  return (
    <button className={cx('load-more-button')} onClick={handleClick}>
      <p className={cx('button-text')}>이 주변 더 살펴보기</p>
      <p className={cx('counts')}>
        ( {page + 1} / {data?.totalPageCount} )
      </p>
    </button>
  )
}

export default LoadMoreButton
