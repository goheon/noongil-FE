import { getOpenList, getCloseList } from '../mainApi'
import { useQuery } from '@tanstack/react-query'
import { EventCategory } from '../type'

const usePeriodList = (category: EventCategory) => {
  const {
    isPending: isOpenListLoading,
    error: openListError,
    data: openList = [],
  } = useQuery({
    queryKey: ['open-list', category],
    queryFn: () => getOpenList(category),
  })

  const {
    isPending: isCloseListLoading,
    error: closeListError,
    data: closeList = [],
  } = useQuery({
    queryKey: ['close-list', category],
    queryFn: () => getCloseList(category),
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
