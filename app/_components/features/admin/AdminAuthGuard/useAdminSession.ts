import { useQuery } from '@tanstack/react-query'
import { checkAdminAuth, adminLogout } from '../adminApi'

const useAdminSession = () => {
  const { isLoading, isError } = useQuery({
    queryKey: ['adminAuth'],
    queryFn: checkAdminAuth,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })

  return {
    isLoading,
    isError,
  }
}

export default useAdminSession
