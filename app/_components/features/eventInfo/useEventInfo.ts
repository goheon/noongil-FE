import { getEventInfo } from './eventInfoApi'
import { useQuery } from '@tanstack/react-query'

const useEventInfo = (id: string) => {
  const { isLoading, data } = useQuery({
    queryKey: ['event-info', id],
    queryFn: () => getEventInfo(id),
    enabled: !!id,
  })

  return {
    isLoading,
    eventDetail: data?.eventDetails,
    nearEvents: data?.nearEvents,
  }
}

export default useEventInfo
