import { searchMapInfo } from './mapSearchApi'
import { useQuery } from '@tanstack/react-query'

export const useMapQuery = () => {
  const filter = {}

  return useQuery({
    queryKey: ['map', filter],
    queryFn: () => searchMapInfo(),
  })
}
