import {
  getEventMainImage,
  getEventContentImage,
  registerMainImage,
  registerContentImage,
  deleteImage,
} from '../adminApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useEventImageFrom = (eventId: string) => {
  const queryClient = useQueryClient()

  const { data: mainImage } = useQuery({
    queryKey: ['event-main-image', eventId],
    queryFn: () => getEventMainImage(eventId),
  })

  const { data: contentImage } = useQuery({
    queryKey: ['event-content-image', eventId],
    queryFn: () => getEventContentImage(eventId),
  })

  const uploadMainImageMution = useMutation({
    mutationFn: registerMainImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['event-main-image', eventId],
      })
    },
  })

  const uploadContentImageMutation = useMutation({
    mutationFn: registerContentImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['event-content-image', eventId],
      })
    },
  })

  const deleteMainImageMutation = useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['event-main-image', eventId],
      })
    },
  })

  const deleteContentImageMutation = useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['event-content-image', eventId],
      })
    },
  })

  return {
    mainImage,
    contentImage,
    uploadMainImageMution,
    uploadContentImageMutation,
    deleteMainImageMutation,
    deleteContentImageMutation,
  }
}

export default useEventImageFrom
