import { config } from '../_lib/constants'

// 네이버 로그인
export const getNaverLogin = () => {
  const authUrl = `${config.API_LOGIN_BASE_URL}/authorization/naver`
  window.location.href = authUrl
}

// 카카오 로그인
export const getKakaoLogin = () => {
  const authUrl = `${config.API_LOGIN_BASE_URL}/authorization/kakao`
  window.location.href = authUrl
}

// 구글 로그인
export const getGoogleLogin = () => {
  const authUrl = `${config.API_LOGIN_BASE_URL}/authorization/google`
  window.location.href = authUrl
}
