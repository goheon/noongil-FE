import styles from './MyPage.module.scss'
import classNames from 'classnames/bind'
import UserInfo from './UserInfo/UserInfo'
import { ICON } from '@/public'
import ServiceList, { ServiceItemProps } from './ServiceList/ServiceList'
import useUserAuth from './useUserAuth'

const usageServices: ServiceItemProps[] = [
  { icon: ICON.heart_gray, label: '내 관심사', linkUrl: '/my/interest' },
  {
    icon: ICON.bookmark_gray,
    label: '즐겨찾기 팝업 / 전시',
    linkUrl: '/my/bookmark',
  },
]

const infoServices: ServiceItemProps[] = [
  { icon: ICON.announce_gray, label: '공지사항' },
  { icon: ICON.bookmark_gray, label: '서비스 이용약관' },
  { icon: ICON.terms_gray, label: '개인정보 처리방침' },
  { icon: ICON.operator_gray, label: '고객센터' },
]

const cx = classNames.bind(styles)

const MyPage = () => {
  const { userLogout } = useUserAuth()

  return (
    <div className={cx('container')}>
      <UserInfo />

      <ServiceList title="서비스 이용" items={usageServices} />
      <ServiceList title="서비스 안내" items={infoServices} />

      <button className={cx('logout-btn')} onClick={() => userLogout()}>
        로그아웃
      </button>
    </div>
  )
}

export default MyPage
