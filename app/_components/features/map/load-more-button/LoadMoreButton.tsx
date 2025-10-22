import { useMapFilterStore } from '@/app/_store/map/useMapFilterStore'
import classNames from 'classnames/bind'
import { useMapQuery } from '../useMapQuery'

import styles from './LoadMoreButton.module.scss'

const cx = classNames.bind(styles)

const LoadMoreButton = () => {
  const { data } = useMapQuery()
  const page = useMapFilterStore((s) => s.page)
  const setPage = useMapFilterStore((s) => s.setPage)

  const handleClick = () => {
    setPage(page + 1)
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
