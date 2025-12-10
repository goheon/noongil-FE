import { useSearchParams } from 'next/navigation'
import { useListFilterStore } from '@/app/_store/listFilter/useListFilterStore'
import { TOrder } from './type'
import { TEventCategory } from '@/app/_types'
import { useEffect, useRef } from 'react'
import { parseISO, isValid } from 'date-fns'
import { IGeoData } from './type'

const ORDER_FILER_VALUE_MAP: Record<string, TOrder> = {
  '10': 'popular',
  '20': 'newest',
  '30': 'ending',
}

export const useSyncStoreWithURL = () => {
  const searchParams = useSearchParams()
  const lastSyncedParams = useRef<string | null>(null)

  const {
    regionFilter,
    regions,
    category,
    setCategory,
    setOrder,
    setStartDate,
    setEndDate,
    setRegion,
    setKeyword,
    setSeoulCheck,
    setGyenggiCheck,
  } = useListFilterStore()

  useEffect(() => {
    const currentParams = searchParams.toString()

    // regionFilter가 로드된 상태에서 이미 동기화된 params면 스킵
    if (regionFilter && lastSyncedParams.current === currentParams) {
      return
    }

    // 카테고리
    const categoriesStr = searchParams.get('categories') ?? ''
    const categories = categoriesStr
      ? (categoriesStr.split(',') as TEventCategory[])
      : []

    // URL에는 있는데 store에는 없는 것 → 추가
    categories.forEach((cat) => {
      if (!category.includes(cat)) {
        setCategory(cat)
      }
    })

    // store에는 있는데 URL에는 없는 것 → 제거
    category.forEach((cat) => {
      if (!categories.includes(cat)) {
        setCategory(cat) // 토글이므로 다시 호출하면 제거됨
      }
    })

    // 지역 (regionFilter가 로드된 경우에만)
    if (regionFilter) {
      const regionsStr = searchParams.get('regions') ?? ''
      const regionCodes = regionsStr ? regionsStr.split(',') : []

      const allRegions = Object.values(regionFilter).flat()

      const selectedRegions = regionCodes
        .map((code) => allRegions.find((region) => region.rgntCd === code))
        .filter(Boolean) as IGeoData[]

      // URL에는 있는데 store에는 없는 것 → 추가
      selectedRegions.forEach((region) => {
        const exists = regions.some((r) => r.rgntCd === region.rgntCd)
        if (!exists) {
          setRegion(region)
        }
      })

      // store에는 있는데 URL에는 없는 것 → 제거
      regions.forEach((region) => {
        const inUrl = selectedRegions.some((r) => r.rgntCd === region.rgntCd)
        if (!inUrl) {
          setRegion(region) // 토글이므로 다시 호출하면 제거됨
        }
      })

      const hasSeoul = selectedRegions.some((r) => r.rgntTypeCd === '10')
      const hasGyeonggi = selectedRegions.some((r) => r.rgntTypeCd === '20')

      setSeoulCheck(hasSeoul)
      setGyenggiCheck(hasGyeonggi)
    }

    // 정렬
    const order = searchParams.get('sortType') as TOrder
    if (order) setOrder(ORDER_FILER_VALUE_MAP[order])

    // 날짜
    const start = searchParams.get('startDate')

    if (start) {
      const date = parseISO(start)
      if (isValid(date)) {
        setStartDate(date)
      } else {
        console.warn('Invalid date format:', start)
      }
    }

    const end = searchParams.get('endDate')
    if (end) {
      const date = parseISO(end)

      if (isValid(date)) {
        setEndDate(date)
      } else {
        console.warn('Invalid date format:', end)
      }
    }

    // 검색어
    const keyword = searchParams.get('keyword') ?? ''
    setKeyword(keyword)

    // regionFilter가 로드된 후에만 동기화 완료로 표시
    if (regionFilter) {
      lastSyncedParams.current = currentParams
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionFilter, searchParams])
}

export default useSyncStoreWithURL
