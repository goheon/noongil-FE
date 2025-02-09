import { getEventList } from '../adminApi'
import { IEventListItem } from '../type'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const useEventList = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['event-list'],
    queryFn: ({ pageParam }) => getEventList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      // const totalPages = Math.ceil(lastPage.total / 10)
      const totalPages = lastPage.total
      const nextPage = pages.length + 1

      return nextPage <= totalPages ? nextPage : undefined
    },
  })

  const list = useMemo(() => {
    return data?.pages?.reduce<IEventListItem[]>((acc, item) => {
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

export default useEventList
