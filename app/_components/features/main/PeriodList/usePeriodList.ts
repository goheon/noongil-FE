import { getOpenList, getCloseList } from '../mainApi'
import { useQuery } from '@tanstack/react-query'
import { IListItem } from '../type'
import { TAllEventCode } from '@/app/_types'

const filterDays = (data: IListItem[]) => {
  return data.filter((item) => Number(item.dday.replace('D-', '')) <= 14)
}

const usePeriodList = (eventCode: TAllEventCode) => {
  const {
    isPending: isOpenListLoading,
    error: openListError,
    data: openList = [],
  } = useQuery({
    queryKey: ['open-list', eventCode],
    queryFn: () => getOpenList(eventCode),
    select: (data) => filterDays(data),
  })

  const {
    isPending: isCloseListLoading,
    error: closeListError,
    data: closeList = [],
  } = useQuery({
    queryKey: ['close-list', eventCode],
    queryFn: () => getCloseList(eventCode),
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
