type Environment = keyof typeof API_BASE_URL_LIST

const ENV: Environment = process.env.NODE_ENV

const NAVER_MAP_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID
const NAVER_MAP_CLIENT_KEY = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_KEY

const API_BASE_URL_LIST = {
  production: 'asd',
  development: '/api',
  test: '',
}

const API_BASE_URL = API_BASE_URL_LIST[ENV]

const VALID_CATEGORIES = ['popup', 'exhibition']

const config = {
  ENV,
  NAVER_MAP_CLIENT_ID,
  NAVER_MAP_CLIENT_KEY,
  API_BASE_URL,
  VALID_CATEGORIES,
} as const

export { config }
