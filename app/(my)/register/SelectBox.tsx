'use client'

import classNames from 'classnames/bind'
import { useRegisterStore } from '@/app/_lib'
import styles from './page.module.scss'

const cx = classNames.bind(styles)
type Category = {
  code: string
  label: string
}

type SelectBoxProps = {
  categories: Category[]
  type: 'popup' | 'exhibition'
}

const SelectBox = ({ categories, type }: SelectBoxProps) => {
  const { selectedFavPU, selectedFavEHB, setSelectedFavEHB, setSelectedFavPU } =
    useRegisterStore()

  // 선택 상태 및 setter를 type에 따라 분기
  const selectedList = type === 'popup' ? selectedFavPU : selectedFavEHB
  const setSelectedList =
    type === 'popup' ? setSelectedFavPU : setSelectedFavEHB

  const handleSelect = (code: string) => {
    if (selectedList.includes(code)) {
      // 이미 선택됨 → 제거
      setSelectedList(selectedList.filter((item) => item !== code))
    } else {
      // 선택 안됨 → 추가
      setSelectedList([...selectedList, code])
    }
  }

  return (
    <div className={cx('selector-box')}>
      {categories.map((el) => (
        <div
          key={el.code}
          className={cx('chip', { selected: selectedList.includes(el.code) })}
          onClick={() => handleSelect(el.code)}
        >
          #{el.label}
        </div>
      ))}
    </div>
  )
}

export { SelectBox }
