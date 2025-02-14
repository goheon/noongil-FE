import { getOpenList, getCloseList } from '../mainApi'
import { useQuery } from '@tanstack/react-query'

const usePeriodList = () => {
  const {
    isPending: isOpenListLoading,
    error: openListError,
    data: openList = [],
  } = useQuery({
    queryKey: ['open-list'],
    queryFn: getOpenList,
  })

  const {
    isPending: isCloseListLoading,
    error: closeListError,
    data: closeList = [],
  } = useQuery({
    queryKey: ['close-list'],
    queryFn: getCloseList,
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
