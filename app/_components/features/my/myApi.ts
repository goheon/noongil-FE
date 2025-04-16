import axios from 'axios'

interface IUserInfoResponse {
  joinYn: string
  socialLoginProviderCode: string
  userId: number
  username: string
}

// API URL, cookie 이슈 해결시 url 변경 필요
export const getUserInfo = async (): Promise<IUserInfoResponse> => {
  try {
    const response = await axios.get(
      'http://localhost:8080/api/auth/user-info',
      {
        withCredentials: true,
      },
    )

    return response.data
  } catch (err) {
    console.log('get user info :', err)
    throw err
  }
}

export const logout = async () => {
  try {
    await axios.delete('http://localhost:8080/api/auth/logout', {
      withCredentials: true,
    })
  } catch (err) {
    console.log('logout :', err)
    throw err
  }
}

export const deleteUserAccount = async () => {
  try {
    await axios.delete('http://localhost:8080/api/user', {
      withCredentials: true,
    })
  } catch (err) {
    console.log('delete user :', err)
    throw err
  }
}

export const getUserCategories = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8080/api/user-categories',
      {
        withCredentials: true,
      },
    )

    console.log('user res :', response)

    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}
