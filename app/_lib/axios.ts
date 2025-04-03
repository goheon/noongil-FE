import axios from 'axios'

import { config } from './constants'

const axiosApi = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: 2000,
})

export { axiosApi }
