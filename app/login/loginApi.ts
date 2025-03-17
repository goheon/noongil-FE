import { loginApi } from '../_lib/axios'

// 네이버 로그인
export const getNaverLogin = async () => {
  try {
    const response = await loginApi.get('authorization/naver')
    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

// 카카오 로그인
export const getKakaoLogin = async () => {
  try {
    const response = await loginApi.get('authorization/kakao')
    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

// 구글 로그인
export const getGoogleLogin = async () => {
  try {
    const response = await loginApi.get('authorization/google')
    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}
