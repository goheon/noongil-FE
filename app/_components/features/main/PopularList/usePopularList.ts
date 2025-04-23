import { getPopularList } from '../mainApi'
import { useQuery } from '@tanstack/react-query'
import { EventType } from '../type'

const usePopularList = (category: EventType) => {
  const {
    data: popularList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['popular-list', category],
    queryFn: () => getPopularList(category),
  })

  return { popularList, isLoading, error }
}

export default usePopularList
