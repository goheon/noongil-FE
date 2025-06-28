type Environment = keyof typeof API_BASE_URL_OBJ

const ENV: Environment = process.env.NODE_ENV

const NAVER_MAP_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID
const NAVER_MAP_CLIENT_KEY = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_KEY

const API_BASE_URL_OBJ = {
  production: 'https://api.noongil.org/api',
  development:
    'http://ec2-3-36-23-213.ap-northeast-2.compute.amazonaws.com:8080/api',
  // development: 'http://localhost:8080/api',
  test: '',
}

const API_LOGIN_BASE_URL_OBJ = {
  production: 'https://api.noongil.org/oauth2',
  development: 'http://localhost:8080/oauth2',
  test: '',
}

const API_BASE_URL = API_BASE_URL_OBJ[ENV]
const API_LOGIN_BASE_URL = API_LOGIN_BASE_URL_OBJ[ENV]

const VALID_CATEGORIES = ['popup', 'exhibition']

const config = {
  ENV,
  NAVER_MAP_CLIENT_ID,
  NAVER_MAP_CLIENT_KEY,
  API_BASE_URL,
  API_LOGIN_BASE_URL,
  VALID_CATEGORIES,
} as const

export { config }
