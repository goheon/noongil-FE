import { useSearchParams } from 'next/navigation'
import { useListFilterStore } from '@/app/_store/listFilter/useListFilterStore'
import { TOrder } from './type'
import { TEventCategory } from '@/app/_types'
import { useEffect } from 'react'
import { parseISO, isValid } from 'date-fns'

export const useSyncStoreWithURL = () => {
  const searchParams = useSearchParams()

  const {
    setCategory,
    setOrder,
    setStartDate,
    setEndDate,
    setRegion,
    setKeyword,
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
    const regions = regionsStr ? regionsStr.split(',') : []
    regions.forEach((region) => setRegion(region))

    // 정렬
    const order = searchParams.get('order') as TOrder
    if (order) setOrder(order)

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
  }, [])
}

export default useSyncStoreWithURL
