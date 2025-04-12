import classNames from 'classnames/bind'
import { SelectBox } from './SelectBox'
import { ButtonBox } from './ButtonBox'

import styles from './page.module.scss'

const cx = classNames.bind(styles)

const EHB_CATEGORIES_ARR = [
  {
    code: 'PHOT',
    label: '사진전',
  },
  {
    code: 'PAINT',
    label: '그림전',
  },
  {
    code: 'MEDIA',
    label: '미디어아트',
  },
  {
    code: 'SCULP',
    label: '조각/설치미술',
  },
  {
    code: 'DESIGN',
    label: '디자인',
  },
  {
    code: 'EXPER',
    label: '체험형전시',
  },
  {
    code: 'CHILD',
    label: '어린이',
  },
  {
    code: 'COMIC',
    label: '만화',
  },
]

const PU_CATEGORIES_ARR = [
  {
    code: 'PASH',
    label: '패션',
  },
  {
    code: 'CHAR',
    label: '캐릭터',
  },
  {
    code: 'FANDB',
    label: '식음료(F&B)',
  },
  {
    code: 'BEAU',
    label: '뷰티',
  },
  {
    code: 'IT',
    label: 'IT',
  },
  {
    code: 'LIFT',
    label: '라이프스타일',
  },
  {
    code: 'ENTER',
    label: '엔터',
  },
  {
    code: 'SPORT',
    label: '스포츠/건강',
  },
]

const RegisterPage = () => {
  return (
    <>
      <TitleBox />
      <PopupFavSelectBox />
      <ExhibitionFavSelectBox />
      <ButtonBox />
    </>
  )
}

const TitleBox = () => {
  return (
    <div className={cx('title-box')}>
      <h1 className={cx('title')}>내 관심사</h1>
      <p className={cx('description')}>당신의 눈길이 머무는 곳으로</p>
    </div>
  )
}

const PopupFavSelectBox = () => {
  return (
    <div className={cx('popup-select-box')}>
      <h2 className={cx('title')}>팝업</h2>
      <SelectBox categories={PU_CATEGORIES_ARR} type="popup" />
    </div>
  )
}

const ExhibitionFavSelectBox = () => {
  return (
    <div className={cx('exhibition-select-box')}>
      <h2 className={cx('title')}>전시</h2>
      <SelectBox categories={EHB_CATEGORIES_ARR} type="exhibition" />
    </div>
  )
}

export default RegisterPage
