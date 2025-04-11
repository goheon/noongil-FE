import { bookmarkEventItem } from '../searchApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useBookmarkItem = () => {
  const queryClient = useQueryClient()

  const bookmarkEventMutation = useMutation({
    mutationFn: ({ eventId, likeYn }: { eventId: number; likeYn: string }) =>
      bookmarkEventItem({ eventId, likeYn }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['search-list'] })
    },
  })

  return {
    onBookmark: bookmarkEventMutation.mutate,
  }
}

export default useBookmarkItem
