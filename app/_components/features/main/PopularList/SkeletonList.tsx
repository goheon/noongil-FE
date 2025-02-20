import styles from './SkeletonList.module.scss'
import classNames from 'classnames/bind'
import Skeleton from 'react-loading-skeleton'

const cx = classNames.bind(styles)

const SkeletonList = () => {
  const list = Array.from({ length: 3 })

  return (
    <ul className={cx('skeleton-list')}>
      {list.map((_, idx) => (
        <div className={cx('skeleton-wrapper')} key={idx}>
          <Skeleton width={200} height={200} borderRadius={5} />
          <Skeleton width={200} />
          <Skeleton width={200} />
        </div>
      ))}
    </ul>
  )
}

export default SkeletonList
