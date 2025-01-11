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
        <Image
          className={`${styles['header_search-bar_search-box_icon']}`}
          src={ICON.search_list}
          alt="Search Icon"
          width={30}
          height={30}
        />
        <p>찾기</p>
      </div>
      <div
        className={`${styles[`bottom-navigation_button`]}`}
        onClick={() => router.push('/map')}
      >
        <Image
          className={`${styles['header_search-bar_search-box_icon']}`}
          src={ICON.map}
          alt="Map Icon"
          width={30}
          height={30}
        />
        <p>지도</p>
      </div>
      <div
        className={`${styles[`bottom-navigation_button`]}`}
        onClick={() => router.push('/')}
      >
        <Image
          className={`${styles['header_search-bar_search-box_icon']}`}
          src={ICON.home}
          alt="Home Icon"
          width={30}
          height={30}
        />
        <p>홈</p>
      </div>
      <div
        className={`${styles[`bottom-navigation_button`]}`}
        onClick={() => router.push('/report')}
      >
        <Image
          className={`${styles['header_search-bar_search-box_icon']}`}
          src={ICON.report}
          alt="Report Icon"
          width={30}
          height={30}
        />
        <p>제보</p>
      </div>
      <div
        className={`${styles[`bottom-navigation_button`]}`}
        onClick={() => router.push('/my')}
      >
        <Image
          className={`${styles['header_search-bar_search-box_icon']}`}
          src={ICON.my}
          alt="My Icon"
          width={30}
          height={30}
        />
        <p>마이</p>
      </div>
    </div>
  )
}

export { BottomNavigation }
