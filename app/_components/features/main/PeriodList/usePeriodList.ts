import { getOpenList, getCloseList } from '../mainApi'
import { useQuery } from '@tanstack/react-query'
import { EventCategory, IListItem } from '../type'

const filterDays = (data: IListItem[]) => {
  return data.filter((item) => Number(item.dday.replace('D-', '')) <= 14)
}

const usePeriodList = (category: EventCategory) => {
  const {
    isPending: isOpenListLoading,
    error: openListError,
    data: openList = [],
  } = useQuery({
    queryKey: ['open-list', category],
    queryFn: () => getOpenList(category),
    select: (data) => filterDays(data),
  })

  const {
    isPending: isCloseListLoading,
    error: closeListError,
    data: closeList = [],
  } = useQuery({
    queryKey: ['close-list', category],
    queryFn: () => getCloseList(category),
    select: (data) => filterDays(data),
  })

  return {
    isOpenListLoading,
    openListError,
    openList,
    isCloseListLoading,
    closeListError,
    closeList,
  }
}

export default usePeriodList
