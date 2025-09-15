import Link from 'next/link'
import classNames from 'classnames/bind'
import styles from './not-found.module.scss'

const cx = classNames.bind(styles)

const NotFound = () => {
  return (
    <div className={cx('not-found')}>
      <h2 className={cx('title')}>
        요청하신 페이지를 <br /> 찾지 못했어요.
      </h2>
      <p className={cx('content')}>다른 페이지를 탐색해볼까요?</p>
      <Link className={cx('home')} href="/">
        홈으로 돌아가기
      </Link>
    </div>
  )
}

export default NotFound
