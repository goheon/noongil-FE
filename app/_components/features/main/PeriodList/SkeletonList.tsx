import styles from './SkeletonList.module.scss'
import classNames from 'classnames/bind'
import Skeleton from 'react-loading-skeleton'

const cx = classNames.bind(styles)

const list = Array.from({ length: 3 })

const SkeletonList = () => {
  return (
    <ul className={cx('skeleton-list')}>
      {list.map((_, idx) => (
        <div className={cx('skeleton-wrapper')} key={idx}>
          <Skeleton width={125} height={125} borderRadius={5} />

          <div className={cx('infos')}>
            <Skeleton width={100} />
            <Skeleton width={100} />
          </div>
        </div>
      ))}
    </ul>
  )
}

export default SkeletonList
