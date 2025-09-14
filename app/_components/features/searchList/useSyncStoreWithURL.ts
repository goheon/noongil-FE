import { useSearchParams } from 'next/navigation'
import { useListFilterStore } from '@/app/_store/listFilter/useListFilterStore'
import { TOrder } from './type'
import { TEventCategory } from '@/app/_types'
import { useEffect } from 'react'
import { parseISO, isValid } from 'date-fns'
import { IGeoData } from './type'

const ORDER_FILER_VALUE_MAP: Record<string, TOrder> = {
  '10': 'popular',
  '20': 'newest',
  '30': 'ending',
}

export const useSyncStoreWithURL = () => {
  const searchParams = useSearchParams()

  const {
    regionFilter,
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
    // 카테고리
    const categoriesStr = searchParams.get('categories') ?? ''
    const categories = categoriesStr
      ? (categoriesStr.split(',') as TEventCategory[])
      : []
    categories.forEach((category) => setCategory(category))

    // 지역
    const regionsStr = searchParams.get('regions') ?? ''
    const regionCodes = regionsStr ? regionsStr.split(',') : []

    if (regionFilter) {
      const allRegions = Object.values(regionFilter).flat()

      const selectedRegions = regionCodes
        .map((code) => allRegions.find((region) => region.rgntCd === code))
        .filter(Boolean) as IGeoData[]

      selectedRegions.forEach(setRegion)

      const hasSeoul = selectedRegions.some((r) => r.rgntTypeCd === '10')
      const hasGyeonggi = selectedRegions.some((r) => r.rgntTypeCd === '20')

      setSeoulCheck(hasSeoul)
      setGyenggiCheck(hasGyeonggi)
    }

    // 정렬
    const order = searchParams.get('sortType') as TOrder

    console.log('sync :', order)
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
        console.warn('Invalid date format:', start)
      }
    }

    // 검색어
    const keyword = searchParams.get('keyword') ?? ''
    setKeyword(keyword)
  }, [
    regionFilter,
    searchParams,
    setCategory,
    setEndDate,
    setGyenggiCheck,
    setKeyword,
    setOrder,
    setRegion,
    setSeoulCheck,
    setStartDate,
  ])
}

export default useSyncStoreWithURL
