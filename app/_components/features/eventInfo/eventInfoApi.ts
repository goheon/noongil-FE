import { axiosApi } from '@/app/_lib'
import { IListItem } from '../main/type'
import { IEventInfo } from './type'

interface IEevntInfoResponse {
  eventDetails: IEventInfo
  nearEvents: IListItem[]
}

export const getEventInfo = async (id: string): Promise<IEevntInfoResponse> => {
  try {
    const response = await axiosApi.get(`/events/cntn/${id}`)

    return response.data
  } catch (err) {
    console.log('get event info :', err)
    throw err
  }
}
