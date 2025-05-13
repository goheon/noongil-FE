import { getPopularList } from '../mainApi'
import { useQuery } from '@tanstack/react-query'
import { TAllEventCode } from '@/app/_types'

const usePopularList = (category: TAllEventCode) => {
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
