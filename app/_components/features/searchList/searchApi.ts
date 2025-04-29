import { axiosApi } from '@/app/_lib/axios'
import { EventType } from '../main/type'
import axios from 'axios'

export const bookmarkEventItem = async ({
  eventId,
  likeYn,
}: {
  eventId: number
  likeYn: string
}) => {
  try {
    // 쿠키 이슈 해결 후 기존의 Api endpoint 연결
    // const response = await axiosApi.post(
    //   'mark-events/save',
    // const response = await axios.post(
    //   'http://localhost:8080/api/mark-events/save',
    //   {
    //     eventId,
    //     likeYn,
    //   },
    //   {
    //     withCredentials: true,
    //   },
    // )
    const response = await axiosApi.post(
      'mark-events/save',
      {
        eventId,
        likeYn,
      },
      {
        withCredentials: true,
      },
    )

    console.log('res :', response)
  } catch (err) {
    console.log('bookmark error :', err)
    throw err
  }
}

export const getAllEventList = async ({
  pageParam = 0,
  sortType = '20',
  eventType = 'all',
}: {
  pageParam: number
  sortType: '10' | '20' | '30'
  eventType: EventType
}) => {
  try {
    // 쿠키 이슈 해결 후 기존의 Api endpoint 연결
    // const response = await axiosApi.get(`events/list/${eventType}`, {
    // const response = await axios.get(
    //   `http://localhost:8080/api/events/list/${eventType}`,
    //   {
    //     params: {
    //       page: pageParam,
    //       sortType,
    //     },
    //     withCredentials: true,
    //   },
    // )
    const response = await axiosApi.get(`events/list/${eventType}`, {
      params: {
        page: pageParam,
        sortType,
      },
      withCredentials: true,
    })

    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}
