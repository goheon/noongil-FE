import { axiosApi } from '@/app/_lib'

export const searchMapInfo = async () => {
  try {
    const response = await axiosApi.get(`search/events`)

    return response.data
  } catch (err) {
    console.log('get event info :', err)
    throw err
  }
}
