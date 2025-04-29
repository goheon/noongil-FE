import axios from 'axios'
import { axiosApi } from '@/app/_lib/axios'
import {
  IEventListItem,
  EventListResponse,
  IEventDetail,
  IGeocodingResponse,
} from './type'

// cookie sameSite 이슈 해결 후 수정
export const adminLogin = async ({
  id,
  password,
}: {
  id: string
  password: string
}) => {
  try {
    // const response = await axios.post(
    //   'http://localhost:8080/api/admin/login',
    const response = await axiosApi.post(
      `admin/login`,
      {
        id,
        password,
      },
      {
        withCredentials: true,
      },
    )
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

// cookie sameSite 이슈 해결 후 수정
export const adminLogout = async () => {
  try {
    // await axios.delete(`http://localhost:8080/api/admin/logout`, {
    //   withCredentials: true,
    // })
    await axiosApi.delete('admin/logout', {
      withCredentials: true,
    })
  } catch (err) {
    console.log('admin logout error :', err)
    throw err
  }
}

// cookie sameSite 이슈 해결 후 수정
export const checkAdminAuth = async () => {
  try {
    // const response = await axios.get(
    //   `http://localhost:8080/api/admin/user-info`,
    //   {
    //     withCredentials: true,
    //   },
    // )
    const response = await axiosApi.get('admin/user-info', {
      withCredentials: true,
    })

    return response
  } catch (err) {
    console.log('check admin error :', err)
    throw err
  }
}

export const getEventList = async (
  pageParam: number = 0,
): Promise<EventListResponse> => {
  try {
    const response = await axiosApi.get('admin/events', {
      params: {
        page: pageParam,
      },
    })

    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

export const getEventDetail = async (
  eventId: number,
): Promise<IEventDetail> => {
  try {
    const response = await axiosApi.get(`admin/events/${eventId}`)

    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

export const updateEventDetail = async ({
  eventId,
  eventDetail,
}: {
  eventId: string
  eventDetail: IEventDetail
}) => {
  try {
    const response = await axiosApi.put(`admin/events/${eventId}`, eventDetail)
  } catch (err) {
    throw err
  }
}

export const createEvent = async ({
  eventDetail,
}: {
  eventDetail: IEventDetail
}) => {
  try {
    const response = await axiosApi.post(`admin/events`, eventDetail)
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

export const deleteEvent = async (eventId: string) => {
  try {
    const response = await axiosApi.delete(`admin/events/${eventId}`)
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

export const getEventMainImage = async (eventId: string) => {
  try {
    const response = await axiosApi.get(`admin/events/${eventId}/main-files`)

    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

export const getEventContentImage = async (eventId: string) => {
  try {
    const response = await axiosApi.get(`admin/events/${eventId}/files`)

    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

export const registerMainImage = async ({
  eventId,
  mainImage,
}: {
  eventId: string
  mainImage: File
}) => {
  try {
    const formData = new FormData()

    formData.append('file', mainImage)

    await axiosApi.post(`admin/events/${eventId}/file/main`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

export const registerContentImage = async ({
  eventId,
  contentImage,
}: {
  eventId: string
  contentImage: FileList
}) => {
  try {
    const formData = new FormData()

    for (let i = 0; i < contentImage.length; i++) {
      formData.append('file', contentImage[i])
    }

    await axiosApi.post(`admin/events/${eventId}/file/detail`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

export const deleteImage = async (imageId: string) => {
  try {
    await axiosApi.delete(`admin/events/files/${imageId}`)
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

export const getGeoCodeInfo = async (
  address: string,
): Promise<IGeocodingResponse> => {
  try {
    const response = await axios.get(
      `/api/geocoding?query=${encodeURIComponent(address)}`,
    )

    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}
