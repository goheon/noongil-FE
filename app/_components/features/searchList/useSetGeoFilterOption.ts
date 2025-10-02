import { getGeoOptions } from './searchApi'
import { useQuery } from '@tanstack/react-query'
import { useListFilterStore } from '@/app/_store/listFilter/useListFilterStore'
import { useEffect } from 'react'

const useSetGeoFilterOption = () => {
  const { regionFilter, setRegionFilter } = useListFilterStore()

  const { data } = useQuery({
    queryKey: ['geo-filter'],
    queryFn: getGeoOptions,
    staleTime: 1000 * 60 * 10,
    enabled: regionFilter === null,
  })

  useEffect(() => {
    if (data) {
      setRegionFilter(data)
    }
  }, [data, setRegionFilter])
}

export default useSetGeoFilterOption
