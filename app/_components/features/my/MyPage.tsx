import styles from './MyPage.module.scss'
import classNames from 'classnames/bind'
import UserInfo from './UserInfo/UserInfo'
import { ICON } from '@/public'
import ServiceList, { ServiceItemProps } from './ServiceList/ServiceList'
import useUserAuth from './useUserAuth'

const usageServices: ServiceItemProps[] = [
  { icon: ICON.heart_gray, label: '내 관심사', linkUrl: '/my/categories' },
  {
    icon: ICON.bookmark_gray,
    label: '즐겨찾기 팝업 / 전시',
    linkUrl: '/my/favorites',
  },
]

const infoServices: ServiceItemProps[] = [
  {
    icon: ICON.announce_gray,
    label: '공지사항',
    linkUrl:
      'https://temporal-weather-18e.notion.site/253a43bae17a808c98add37b3363d3c9?v=253a43bae17a805bb5c8000cbb584c6e&p=253a43bae17a8035825fcdade559197c&pm=s',
  },
  {
    icon: ICON.bookmark_gray,
    label: '서비스 이용약관',
    linkUrl:
      'https://temporal-weather-18e.notion.site/18da43bae17a81818e21fc2b67eaa21d?pvs=143',
  },
  {
    icon: ICON.terms_gray,
    label: '개인정보 처리방침',
    linkUrl:
      'https://temporal-weather-18e.notion.site/18da43bae17a81d8b1badd9f45d0061f?pvs=143',
  },
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
