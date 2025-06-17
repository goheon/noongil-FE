import { getSearchEventList } from './searchApi'
import { ISearchListItem } from './type'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { TAllEventCode } from '@/app/_types'

const useSearchList = (eventCode: TAllEventCode) => {
  const searchParams = useSearchParams()

  const categories = searchParams.get('categories') ?? ''
  const startDate = searchParams.get('startDate') ?? ''
  const endDate = searchParams.get('endDate') ?? ''
  const regions = searchParams.get('regions') ?? ''
  const sortType = searchParams.get('sortType') ?? ''
  const keyword = searchParams.get('keyword') ?? ''

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [
        'search-list',
        eventCode,
        sortType,
        keyword,
        startDate,
        endDate,
        categories,
        regions,
      ],
      queryFn: ({ pageParam }) =>
        getSearchEventList({
          page: pageParam,
          sortType,
          eventCode,
          keyword,
          operEndDt: startDate,
          operStatDt: endDate,
          categories,
          regionGroups: regions,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        const nextPage = pages.length
        return nextPage < lastPage.totalPageCount ? nextPage : undefined
      },
    })

  const list = useMemo(() => {
    return data?.pages?.reduce<ISearchListItem[]>((acc, item) => {
      return acc.concat(item?.events ?? [])
    }, [])
  }, [data])

  return {
    list,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  }
}

export default useSearchList
