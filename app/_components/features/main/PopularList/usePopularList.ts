import { getPopularList } from '../mainApi'
import { useQuery } from '@tanstack/react-query'
import { EventCategory } from '../type'

const usePopularList = (category: EventCategory) => {
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
