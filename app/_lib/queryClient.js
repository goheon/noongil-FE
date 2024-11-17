// lib/queryClient.js
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 사용자가 작업 중일 때 리패치 방지
      refetchOnReconnect: true, // 네트워크 복원 시 리패치 활성화
      staleTime: 60000, // 데이터 유효 시간을 1분으로 설정
      cacheTime: 300000, // 캐시 데이터를 5분 동안 유지
      retry: 2, // 요청 실패 시 2회 재시도
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 3000), // 지수 백오프
      onError: (error) => {
        console.error('쿼리 실패:', error)
      },
    },
    mutations: {
      retry: 1, // 재시도 횟수를 1로 제한
      retryDelay: 1000, // 1초 대기 후 재시도
      onError: (error) => {
        console.error('Mutation 실패:', error)
      },
      onSuccess: (data) => {
        console.log('Mutation 성공:', data)
      },
    },
  },
})

export { queryClient }
