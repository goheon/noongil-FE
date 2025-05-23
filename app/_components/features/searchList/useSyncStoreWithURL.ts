import { useSearchParams } from 'next/navigation'
import { useListFilterStore } from '@/app/_store/listFilter/useListFilterStore'
import { TOrder } from './type'
import { TEventCategory } from '@/app/_types'
import { useEffect } from 'react'
import { parseISO, isValid } from 'date-fns'

export const useSyncStoreWithURL = (params: URLSearchParams) => {
  const { setCategory, setOrder, setStartDate, setEndDate, setRegion, reset } =
    useListFilterStore()

  useEffect(() => {
    const categoriesStr = params.get('categories') ?? ''
    const categories = categoriesStr
      ? (categoriesStr.split(',') as TEventCategory[])
      : []
    categories.forEach((category) => setCategory(category))

    // 3. 지역
    const regionsStr = params.get('regions') ?? ''
    const regions = regionsStr ? regionsStr.split(',') : []
    regions.forEach((region) => setRegion(region))

    // 4. 정렬
    const order = params.get('order') as TOrder
    if (order) setOrder(order)

    // 5. 날짜
    const start = params.get('startDate')

    if (start) {
      const date = parseISO(start)
      if (isValid(date)) {
        setStartDate(date)
      } else {
        console.warn('Invalid date format:', start)
      }
    }

    const end = params.get('endDate')
    if (end) {
      const date = parseISO(end)

      if (isValid(date)) {
        setEndDate(date)
      } else {
        console.warn('Invalid date format:', start)
      }
    }
  }, [])
}

export default useSyncStoreWithURL
