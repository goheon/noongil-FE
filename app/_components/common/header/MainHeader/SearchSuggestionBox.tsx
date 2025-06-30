import { useEffect } from 'react'
import styles from './SearchSuggestionBox.module.scss'
import classNames from 'classnames/bind'
import RecentKeyword from './RecentKeyword'
import { getPopularKeywords } from '@/app/_components/features/searchList/searchApi'
import { useQuery } from '@tanstack/react-query'
import useApplySearchParams from '@/app/_components/features/searchList/useApplySearchParams'

const cx = classNames.bind(styles)

interface SearchSuggestionBoxProps {
  isExhibition: boolean
  closeSearchBox: () => void
}

const SearchSuggestionBox = (props: SearchSuggestionBoxProps) => {
  const { isExhibition, closeSearchBox } = props

  const { applyParams } = useApplySearchParams()

  useEffect(() => {
    document.body.style.overflow = 'hidden' // 컴포넌트가 보일 때 스크롤 막기

    return () => {
      document.body.style.overflow = '' // 컴포넌트가 사라질 때 스크롤 막기 해제
    }
  }, [])

  const { data, isLoading } = useQuery({
    queryKey: ['popular-keyword'],
    queryFn: getPopularKeywords,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const handleClick = (keyword: string) => {
    setTimeout(() => {
      applyParams({
        keyword,
      })
    }, 0)

    closeSearchBox()
  }

  return (
    <div className={cx('container')}>
      <RecentKeyword
        isExhibition={isExhibition}
        closeSearchBox={closeSearchBox}
      />

      <div className={cx('popular-keyword')}>
        <div className={cx('title')}>인기 검색어</div>

        {data?.events && data.events.length > 0 ? (
          <ul className={cx('list')}>
            {data.events.map((item) => (
              <li
                className={cx('list-item')}
                key={item.pplrSrchId}
                onClick={() => handleClick(item.pplrSrchCntn)}
              >
                <span>{item.pplrSrchRank}.</span>
                <span>{item.pplrSrchCntn}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

export default SearchSuggestionBox
