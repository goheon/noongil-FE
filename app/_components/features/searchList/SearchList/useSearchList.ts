import { getSearchEventList } from '../searchApi'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { ISearchListItem, ISearchEventParms } from '../type'

type IUseSearchListArgs = Omit<ISearchEventParms, 'page'>

const useSearchList = (args: IUseSearchListArgs) => {
  const {
    eventCode,
    sortType,
    keyword,
    operEndDt,
    operStatDt,
    categories,
    regionGroups,
  } = args

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [
        'search-list',
        eventCode,
        sortType,
        keyword,
        operEndDt,
        operStatDt,
        categories,
        regionGroups,
      ],
      queryFn: ({ pageParam }) =>
        getSearchEventList({
          page: pageParam,
          sortType,
          eventCode,
          keyword,
          operEndDt,
          operStatDt,
          categories,
          regionGroups,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        const totalPages = lastPage.total
        const nextPage = pages.length + 1

        return nextPage <= totalPages ? nextPage : undefined
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
