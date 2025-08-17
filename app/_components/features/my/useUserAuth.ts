import { getUserInfo, logout, deleteUserAccount } from './myApi'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const useUserAuth = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const isCheckable = document.cookie
    .split('; ')
    .some((cookie) => cookie.startsWith(`access_token=`))

  const {
    data: userInfo,
    isError,
    error,
  } = useQuery({
    queryKey: ['user-auth'],
    queryFn: getUserInfo,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: isCheckable,
  })

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['map-user-categories'],
      })
      router.push('/')
    },
  })

  const deleteAccountMutation = useMutation({
    mutationFn: deleteUserAccount,
    onSuccess: () => {
      router.push('/')
    },
  })

  const isUnauthorized = isError && (error as any)?.response?.status === 401
  const isLoggedIn = !!userInfo && !isUnauthorized

  return {
    userInfo,
    userLogout: logoutMutation.mutate,
    deleteUser: deleteAccountMutation.mutate,
    isLoggedIn,
  }
}

export default useUserAuth
