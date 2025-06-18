import { useEffect } from 'react'
import styles from './SearchSuggestionBox.module.scss'
import classNames from 'classnames/bind'
import RecentKeyword from './RecentKeyword'

const cx = classNames.bind(styles)

const POPULAR_KEYWORDS = [
  '데이식스',
  '트와이스',
  '루피',
  '짱구',
  '고흐',
  '크리스마스',
]

interface SearchSuggestionBoxProps {
  isExhibition: boolean
}

const SearchSuggestionBox = (props: SearchSuggestionBoxProps) => {
  const { isExhibition } = props

  useEffect(() => {
    document.body.style.overflow = 'hidden' // 컴포넌트가 보일 때 스크롤 막기

    return () => {
      document.body.style.overflow = '' // 컴포넌트가 사라질 때 스크롤 막기 해제
    }
  }, [])

  return (
    <div className={cx('container')}>
      <RecentKeyword isExhibition={isExhibition} />

      <div className={cx('popular-keyword')}>
        <div className={cx('title')}>인기 검색어</div>

        <ul className={cx('list')}>
          {POPULAR_KEYWORDS.map((el, idx) => (
            <li className={cx('list-item')} key={el}>
              {idx + 1}.{el}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SearchSuggestionBox
