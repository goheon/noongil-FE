import { getUserBookmarkEvent } from './myApi'
import { useQuery } from '@tanstack/react-query'

const useMyFavorites = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['user-favorites'],
    queryFn: getUserBookmarkEvent,
  })

  return {
    data,
    isLoading,
  }
}

export default useMyFavorites
