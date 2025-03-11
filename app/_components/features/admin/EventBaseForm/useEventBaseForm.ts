import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import {
  getEventDetail,
  createEvent,
  updateEventDetail,
  deleteEvent,
} from '../adminApi'
import { useRouter } from 'next/navigation'
import { SubmitHandler } from 'react-hook-form'
import { useMemo } from 'react'
import { format, parse } from 'date-fns'
import { IEventDetail } from '../type'

const parseDate = (dateString?: string) => {
  return dateString ? parse(dateString, 'yyyyMMdd', new Date()) : null
}

const useEventBaseForm = (eventId?: string) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: eventData } = useQuery({
    queryKey: ['event-detail', eventId],
    queryFn: () => (eventId ? getEventDetail(Number(eventId)) : null),
    enabled: !!eventId,
  })

  const createEventMutation = useMutation({
    mutationFn: (data: IEventDetail) => createEvent({ eventDetail: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event-list'] })
      router.push('/admin/eventlist')
    },
  })

  const updateEventMutation = useMutation({
    mutationFn: (data: IEventDetail) =>
      updateEventDetail({ eventId: eventId!, eventDetail: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event-detail', eventId] })
      queryClient.invalidateQueries({ queryKey: ['event-list'] })
      router.push('/admin/eventlist')
    },
  })

  const deleteEventMutation = useMutation({
    mutationFn: () => deleteEvent(eventId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event-list'] })
      router.push('/admin/eventlist')
    },
  })

  const handleSubmit: SubmitHandler<IEventDetail> = (data) => {
    const formattedData = {
      ...data,
      operStatDt: data.operStatDt ? format(data.operStatDt, 'yyyyMMdd') : null,
      operEndDt: data.operEndDt ? format(data.operEndDt, 'yyyyMMdd') : null,
    }

    if (eventId) {
      updateEventMutation.mutate(formattedData)
    } else {
      createEventMutation.mutate(formattedData)
    }
  }

  const handleDelete = () => deleteEventMutation.mutate()

  const initialValues = useMemo(() => {
    if (!eventData) return {}

    return {
      ...eventData,
      operStatDt: parseDate(eventData.operStatDt),
      operEndDt: parseDate(eventData.operEndDt),
    }
  }, [eventData])

  return {
    initialValues,
    onSubmit: handleSubmit,
    onDelete: handleDelete,
  }
}

export default useEventBaseForm
