import styles from './SkeletonList.module.scss'
import classNames from 'classnames/bind'
import Skeleton from 'react-loading-skeleton'

const cx = classNames.bind(styles)

interface SkeletonListProps {
  listType: 'carousel' | 'board'
  cardType: 'column' | 'row'
  length?: number
}

const SkeletonList = (props: SkeletonListProps) => {
  const { listType, cardType, length = 3 } = props

  const list = Array.from({ length: length })

  return (
    <ul
      className={cx('list', {
        'list--carousel': listType === 'carousel',
        'list--board': listType === 'board',
      })}
    >
      {list.map((_, idx) => (
        <li key={idx}>
          {cardType === 'column' ? (
            <div
              className={cx('card--column', {
                'card--column--board': listType === 'board',
              })}
            >
              <Skeleton width={160} height={200} borderRadius={5} />
              <Skeleton width={160} />
              <Skeleton width={160} />
            </div>
          ) : (
            <div className={cx('card--row')}>
              <Skeleton width={125} height={125} borderRadius={5} />

              <div className={cx('infos')}>
                <Skeleton width={200} />
                <Skeleton width={200} />
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default SkeletonList
