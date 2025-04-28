import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { ICON } from '@/public'
import { useLoginStore } from '@/app/_lib'

import styles from './MyPageHeader.module.scss'

// 마이페이지 헤더
const MyPageHeader = () => {
  const { loadEnd } = useLoginStore()
  const pathname = usePathname()
  const router = useRouter()

  let headerText = ''

  switch (pathname) {
    case '/my':
      headerText = '마이페이지'
      break

    case '/my/setting':
      headerText = '계정정보'
      break

    case '/my/categories':
      headerText = '내 관심사'
      break

    case '/my/favorites':
      headerText = '즐겨찾기 팝업 / 전시'
      break

    default:
      headerText = '마이페이지'
      break
  }

  // TODO : 에러 로직 수정
  // if (!loadEnd) return null
  return (
    <div className={`${styles['header_my']}`}>
      {pathname !== '/my' && (
        <Image
          className={`${styles['header_my_icon']}`}
          src={ICON.back_white}
          alt="back Icon"
          width={30}
          height={30}
          onClick={() => {
            router.back()
          }}
        />
      )}
      <div className={`${styles['header_my_text-box']}`}>
        <p className={`${styles['header_my_text-box_text']}`}>{headerText}</p>
      </div>
      {pathname === '/my' && (
        <Image
          className={`${styles['header_my_icon']} ${styles['header_my_icon_setting']}`}
          src={ICON.cogwheel}
          alt="Setting Icon"
          width={30}
          height={30}
          onClick={() => {
            router.push('/my/setting')
          }}
        />
      )}
    </div>
  )
}

export { MyPageHeader }
