import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분, 활성데이터 상태유지
      gcTime: 1000 * 60 * 30, // 30분, 캐시데이터 유지
      refetchOnWindowFocus: true,
      retry: 3,
      notifyOnChangeProps: ['data', 'error'],
    },
    mutations: {
      onSuccess: (data) => {
        console.debug('Mutation success:', data)
      },
      onError: (error) => {
        console.error('Mutation error:', error)
      },
    },
  },
  queryCache: new QueryCache({
    onSuccess: (data, query) => {
      console.debug('QueryCache success:', data)
    },
    onError: (error, query) => {
      console.error('QueryCache error:', error)
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: (data, query) => {
      console.debug('mutationCache success:', data)
    },
    onError: (error, query) => {
      console.error('mutationCache error:', error)
    },
  }),
})

export { queryClient }
