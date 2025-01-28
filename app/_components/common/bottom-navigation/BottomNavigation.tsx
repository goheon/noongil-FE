import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'

import { ICON } from '@/public'
import styles from './bottomNavigation.module.scss'

const BottomNavigation: React.FC = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
    <div className={`${styles[`bottom-navigation`]}`}>
      <div
        className={`${styles[`bottom-navigation_button`]}`}
        onClick={() => router.push('/search')}
      >
        {pathname.includes('/search') ? (
          <Image
            className={`${styles['header_search-bar_search-box_icon']}`}
            src={ICON.search_list_active}
            alt="Search Icon"
            width={30}
            height={30}
          />
        ) : (
          <Image
            className={`${styles['header_search-bar_search-box_icon']}`}
            src={ICON.search_list}
            alt="Search Icon"
            width={30}
            height={30}
          />
        )}
        <p>찾기</p>
      </div>
      <div
        className={`${styles[`bottom-navigation_button`]}`}
        onClick={() => router.push('/map')}
      >
        {pathname.includes('/map') ? (
          <Image
            className={`${styles['header_search-bar_search-box_icon']}`}
            src={ICON.map_active}
            alt="Map Icon"
            width={30}
            height={30}
          />
        ) : (
          <Image
            className={`${styles['header_search-bar_search-box_icon']}`}
            src={ICON.map}
            alt="Map Icon"
            width={30}
            height={30}
          />
        )}
        <p>지도</p>
      </div>
      <div
        className={`${styles[`bottom-navigation_button`]}`}
        onClick={() => router.push('/')}
      >
        {pathname === '/' ? (
          <Image
            className={`${styles['header_search-bar_search-box_icon']}`}
            src={ICON.home_active}
            alt="Home Icon"
            width={30}
            height={30}
          />
        ) : (
          <Image
            className={`${styles['header_search-bar_search-box_icon']}`}
            src={ICON.home}
            alt="Home Icon"
            width={30}
            height={30}
          />
        )}
        <p>홈</p>
      </div>
      <div
        className={`${styles[`bottom-navigation_button`]}`}
        onClick={() => router.push('/report')}
      >
        {pathname.includes('/report') ? (
          <Image
            className={`${styles['header_search-bar_search-box_icon']}`}
            src={ICON.report_active}
            alt="Report Icon"
            width={30}
            height={30}
          />
        ) : (
          <Image
            className={`${styles['header_search-bar_search-box_icon']}`}
            src={ICON.report}
            alt="Report Icon"
            width={30}
            height={30}
          />
        )}
        <p>제보</p>
      </div>
      <div
        className={`${styles[`bottom-navigation_button`]}`}
        onClick={() => router.push('/my')}
      >
        {pathname.includes('/my') ? (
          <Image
            className={`${styles['header_search-bar_search-box_icon']}`}
            src={ICON.my_active}
            alt="My Icon"
            width={30}
            height={30}
          />
        ) : (
          <Image
            className={`${styles['header_search-bar_search-box_icon']}`}
            src={ICON.my}
            alt="My Icon"
            width={30}
            height={30}
          />
        )}

        <p>마이</p>
      </div>
    </div>
  )
}

export { BottomNavigation }
