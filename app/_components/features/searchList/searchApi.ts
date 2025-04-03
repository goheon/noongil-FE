import axios from 'axios'
import { axiosApi } from '@/app/_lib/axios'

export const getAllEventList = async (
  pageParam: number = 1,
  sortType: 10 | 20 | 30 = 10,
) => {
  try {
    const response = await axiosApi.get(
      // `http://127.0.0.1:8080/api/events/list/${sortType}`,
      `events/list`,
      {
        params: {
          page: pageParam,
        },
      },
    )

    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}
