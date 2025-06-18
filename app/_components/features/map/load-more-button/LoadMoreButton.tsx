import classNames from 'classnames/bind'

import styles from './LoadMoreButton.module.scss'

const cx = classNames.bind(styles)

const LoadMoreButton = () => {
  return (
    <button className={cx('load-more-button')}>
      <p className={cx('button-text')}>이 주변 더 살펴보기</p>
      <p className={cx('counts')}>( 1/4 )</p>
    </button>
  )
}

export default LoadMoreButton
