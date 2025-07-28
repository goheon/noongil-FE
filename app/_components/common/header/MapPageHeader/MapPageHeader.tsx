'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'

import { LogoBox, SearchBox } from '../Header'
import SearchSuggestionBox from '../MainHeader/SearchSuggestionBox'
import LoadingSpinner from '../../loading-spinner/LoadingSpinner'

import { axiosApi } from '@/app/_lib'
import { useMapStore } from '@/app/_store/map/useMapStore'
import { useMapFilterStore } from '@/app/_store/map/useMapFilterStore'

import { HeaderProps } from '@/app/_types'
import { MapEventInfo } from '@/app/_components/features'

import classNames from 'classnames/bind'
import { ICON } from '@/public'
import styles from './MapPageHeader.module.scss'
const cx = classNames.bind(styles)

// 지도페이지헤더
const MapPageHeader: React.FC<HeaderProps> = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const isSearchOpen = useMapStore((state) => state.isSearchOpen)
  const setIsListSheetShowing = useMapStore(
    (state) => state.setIsListSheetShowing,
  )
  const setIsSearchOpen = useMapStore.getState().setIsSearchOpen
  const setSelectedType = useMapFilterStore.getState().setSelectedType
  const pathname = usePathname()

  const [searchValue, setSearchValue] = useState('')
  const [debounceSearchValue, setDebouncedSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsSearchOpen(false)
    setSelectedType('all')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }, [pathname, setSelectedType, setIsSearchOpen])

  // 검색창 클릭 및 터치 핸들러 함수
  const handleSearchClick = () => {
    setIsSearchOpen(true)
    setIsListSheetShowing(false)
    inputRef?.current?.focus()
  }

  useEffect(() => {
    setIsLoading(true)

    const timeoutId = setTimeout(() => {
      setDebouncedSearchValue(searchValue)
      setIsLoading(false)
    }, 800)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [searchValue])

  const { data } = useMapSearchQuery(debounceSearchValue)

  return (
    <>
      {/* 헤더 검색 바 */}
      <div className={`${styles['header_search-bar']}`}>
        {/* 로고 박스 */}
        <LogoBox
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          resetSearchValue={() => setSearchValue('')}
        />
        {/* 검색창 박스 */}
        <SearchBox
          handleSearchClick={handleSearchClick}
          inputRef={inputRef}
          isSearchOpen={isSearchOpen}
          value={searchValue}
          setValue={setSearchValue}
        />
      </div>
      {/* 검색 포커스 확장 최근, 인기 검색 목록 */}
      {isSearchOpen && searchValue.length < 1 && (
        <SearchSuggestionBox
          isExhibition={false}
          closeSearchBox={() => setIsSearchOpen(false)}
        />
      )}
      {searchValue.length > 0 && isSearchOpen && (
        <SearchResultBox data={data?.data} isLoading={isLoading} />
      )}
    </>
  )
}

interface SearchResultBoxProps {
  data:
    | {
        events: MapEventInfo[]
      }
    | undefined
  isLoading: boolean
}

const SearchResultBox: React.FC<SearchResultBoxProps> = ({
  data,
  isLoading,
}) => {
  console.log(isLoading, data)

  return (
    <div className={cx('search-box')}>
      {isLoading ? (
        <div className={cx('loading-box')}>
          <LoadingSpinner />
        </div>
      ) : data && data.events.length < 1 ? (
        <div className={`${styles['search-empty-box']}`}>
          <p className={`${styles['search-empty-box_p']}`}>
            검색결과가 없습니다.
            <br />
            검색어를 변경해 보세요.
          </p>
        </div>
      ) : (
        <SearchResultList events={data?.events || []} />
      )}
    </div>
  )
}
type Events = NonNullable<SearchResultBoxProps['data']>['events']

const SearchResultList = ({ events }: { events: Events }) => {
  const mapInstance = useMapStore((s) => s.map)
  const setIsSearchOpen = useMapStore.getState().setIsSearchOpen
  const setIsSelectSheetShowing = useMapStore((s) => s.setIsSelectSheetShowing)
  const setIsListSheetShowing = useMapStore((s) => s.setIsListSheetShowing)
  const setIsSelectSheetOpen = useMapStore((s) => s.setIsSelectSheetOpen)
  const setSelectedEventInfo = useMapStore((s) => s.setSelectedEventInfo)

  return (
    <div className={cx('search-result-list')}>
      {events.map((el, idx) => {
        const handleClick = () => {
          if (mapInstance) {
            setSelectedEventInfo(el)
            mapInstance.setCenter({
              lat: el.addrLttd - 0.001,
              lng: el.addrLotd,
            })
            mapInstance.setZoom(16, true)
            setIsSearchOpen(false)
            setIsSelectSheetShowing(true)
            setIsSelectSheetOpen(true)
          }
        }

        return (
          <div className={cx('event')} key={idx} onClick={handleClick}>
            <Image
              className={cx('search-location-icon')}
              src={ICON.search_location}
              alt="Map Icon"
              width={25}
              height={25}
            />
            <div className={cx('event-info-box')}>
              <p className={cx('event-name')}>{el?.eventNm}</p>
              <p className={cx('event-location')}>{el?.rads}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const useMapSearchQuery = (debounceSearchValue: string) => {
  return useQuery({
    queryKey: ['map-search', debounceSearchValue],
    queryFn: () => searchMapString(debounceSearchValue),
    enabled: debounceSearchValue.length > 0,
  })
}

const searchMapString = async (debounceSearchValue: string) => {
  const result = await axiosApi.get(
    `search/events?keyword=${debounceSearchValue}&page=0`,
  )
  return result
}

export { MapPageHeader }
