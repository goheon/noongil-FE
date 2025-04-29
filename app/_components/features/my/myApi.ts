import axios from 'axios'
import { EventCategory } from '../admin/type'
import { ISearchListItem } from '../searchList/type'
import { axiosApi } from '@/app/_lib'

interface IUserInfoResponse {
  joinYn: string
  socialLoginProviderCode: string
  userId: number
  username: string
}

// API URL, cookie 이슈 해결시 url 변경 필요
export const getUserInfo = async (): Promise<IUserInfoResponse> => {
  try {
    // const response = await axios.get(
    //   'http://localhost:8080/api/auth/user-info',
    //   {
    //     withCredentials: true,
    //   },
    // )
    const response = await axiosApi.get('auth/user-info', {
      withCredentials: true,
    })

    return response.data
  } catch (err) {
    console.log('get user info :', err)
    throw err
  }
}

export const logout = async () => {
  try {
    // await axios.delete('http://localhost:8080/api/auth/logout', {
    //   withCredentials: true,
    // })
    await axiosApi.delete('auth/logout', {
      withCredentials: true,
    })
  } catch (err) {
    console.log('logout :', err)
    throw err
  }
}

export const deleteUserAccount = async () => {
  try {
    // await axios.delete('http://localhost:8080/api/user', {
    //   withCredentials: true,
    // })
    await axiosApi.delete('user', {
      withCredentials: true,
    })
  } catch (err) {
    console.log('delete user :', err)
    throw err
  }
}

export const getUserCategories = async (): Promise<EventCategory[]> => {
  try {
    // const response = await axios.get(
    //   'http://localhost:8080/api/user-categories',
    //   {
    //     withCredentials: true,
    //   },
    // )
    const response = await axiosApi.get('user-categories', {
      withCredentials: true,
    })

    return response.data.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

export const updateUserCategories = async (data: EventCategory[]) => {
  try {
    // await axios.put('http://localhost:8080/api/user-categories', data, {
    //   withCredentials: true,
    // })
    await axiosApi.put('user-categories', data, {
      withCredentials: true,
    })
  } catch (err) {
    console.log('user category :', err)
    throw err
  }
}

export const getUserBookmarkEvent = async (): Promise<ISearchListItem[]> => {
  try {
    // const response = await axios.get(
    //   'http://localhost:8080/api/mark-events/retrieve',
    //   {
    //     withCredentials: true,
    //   },
    // )
    const response = await axiosApi.get('mark-events/retrieve', {
      withCredentials: true,
    })

    return response.data.data
  } catch (err) {
    console.log('get user books mark :', err)
    throw err
  }
}
