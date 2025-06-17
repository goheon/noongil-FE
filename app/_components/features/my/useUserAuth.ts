import { getUserInfo, logout, deleteUserAccount } from './myApi'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const useUserAuth = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: userInfo } = useQuery({
    queryKey: ['user-auth'],
    queryFn: getUserInfo,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
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

  return {
    userInfo,
    userLogout: logoutMutation.mutate,
    deleteUser: deleteAccountMutation.mutate,
  }
}

export default useUserAuth
