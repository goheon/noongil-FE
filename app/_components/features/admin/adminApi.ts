import axios from 'axios'
import {
  IEventListItem,
  EventListResponse,
  IEventDetail,
  IGeocodingResponse,
} from './type'

export const getEventList = async (
  pageParam: number = 0,
): Promise<EventListResponse> => {
  try {
    const response = await axios.get(
      // 'http://ec2-3-36-23-213.ap-northeast-2.compute.amazonaws.com:8080/api/admin/events',
      'http://127.0.0.1:8080/api/admin/events',
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

export const getEventDetail = async (
  eventId: number,
): Promise<IEventDetail> => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8080/api/admin/events/${eventId}`,
    )

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
    const response = await axios.put(
      // `http://ec2-3-36-23-213.ap-northeast-2.compute.amazonaws.com:8080/api/admin/events/${eventId}`,
      `http://127.0.0.1:8080/api/admin/events/${eventId}`,
      eventDetail,
    )
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
    const response = await axios.post(
      // `http://ec2-3-36-23-213.ap-northeast-2.compute.amazonaws.com:8080/api/admin/events`,
      `http://127.0.0.1:8080/api/admin/events`,
      eventDetail,
    )
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

export const deleteEvent = async (eventId: string) => {
  try {
    const response = await axios.delete(
      // `http://ec2-3-36-23-213.ap-northeast-2.compute.amazonaws.com:8080/api/admin/events/${eventId}`,
      `http://127.0.0.1:8080/api/admin/events/${eventId}`,
    )
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

export const getEventMainImage = async (eventId: string) => {
  try {
    const response = await axios.get(
      // `http://ec2-3-36-23-213.ap-northeast-2.compute.amazonaws.com:8080/api/admin/events/${eventId}/main-files`,
      `http://127.0.0.1:8080/api/admin/events/${eventId}/main-files`,
    )

    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

export const getEventContentImage = async (eventId: string) => {
  try {
    const response = await axios.get(
      // `http://ec2-3-36-23-213.ap-northeast-2.compute.amazonaws.com:8080/api/admin/events/${eventId}/files`,
      `http://127.0.0.1:8080/api/admin/events/${eventId}/files`,
    )

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

    await axios.post(
      `http://ec2-3-36-23-213.ap-northeast-2.compute.amazonaws.com:8080/api/admin/events/${eventId}/file/main`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
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

    await axios.post(
      `http://ec2-3-36-23-213.ap-northeast-2.compute.amazonaws.com:8080/api/admin/events/${eventId}/file/detail`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

export const deleteImage = async (imageId: string) => {
  try {
    await axios.delete(
      `http://ec2-3-36-23-213.ap-northeast-2.compute.amazonaws.com:8080/api/admin/events/files/${imageId}`,
    )
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

    return response.data.addresses[0]
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}
