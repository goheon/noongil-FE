import { getAllEventList } from '../searchApi'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { ISearchListItem } from '../type'
import { TAllEventCode } from '@/app/_types'

// TODO : list 관련 API 완성시 로직 수정

const useSearchList = (eventCode: TAllEventCode) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['search-list'],
    queryFn: ({ pageParam }) =>
      getAllEventList({ pageParam, sortType: '20', eventCode: eventCode }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const totalPages = lastPage.total
      const nextPage = pages.length + 1

      return nextPage <= totalPages ? nextPage : undefined
    },
  })

  const list = useMemo(() => {
    return data?.pages?.reduce<ISearchListItem[]>((acc, item) => {
      return acc.concat(item.data)
    }, [])
  }, [data])

  return {
    list,
    fetchNextPage,
    hasNextPage,
    isFetching,
  }
}

export default useSearchList
