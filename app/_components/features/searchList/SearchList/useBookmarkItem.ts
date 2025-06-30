import { bookmarkEventItem } from '../searchApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useBookmarkItem = () => {
  const queryClient = useQueryClient()

  const bookmarkEventMutation = useMutation({
    mutationFn: ({ eventId, likeYn }: { eventId: number; likeYn: string }) =>
      bookmarkEventItem({ eventId, likeYn }),
    onSuccess: (_, { eventId }) => {
      // 검색 결과 무효화
      queryClient.invalidateQueries({ queryKey: ['search-list'] })

      // 즐겨찾기 목록 무효화
      queryClient.invalidateQueries({ queryKey: ['user-favorites'] })

      // 이벤트 상세 정보 무효화
      queryClient.invalidateQueries({
        queryKey: ['event-info', String(eventId)],
      })
    },
  })

  return {
    onBookmark: bookmarkEventMutation.mutate,
  }
}

export default useBookmarkItem
