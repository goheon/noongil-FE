import { checkAdminAuth } from '../adminApi'
import { useQuery } from '@tanstack/react-query'

const useAdminAuthStatus = (enabled: boolean) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['admin-auth'],
    queryFn: checkAdminAuth,
    retry: false,
    enabled: enabled,
  })

  return {
    adminUser: data,
    isError,
    isLoading,
  }
}

export default useAdminAuthStatus
