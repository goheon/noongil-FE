import axios from 'axios'
import { EventCategory } from './type'

// TOOD: main API 완성시 수정 필요

// TOP 배너 추천 리스트 가져오기
export const getBannerEvent = async (category: EventCategory) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8080/api/event/banner/${category}?page=0`,
    )

    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

// 인기 리스트 조회
export const getPopularList = async (category: EventCategory) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8080/api/event/rank/${category}?page=0`,
    )

    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

// 오픈 임박 리스트 조회
export const getOpenList = async (category: EventCategory) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8080/api/events/operStat/${category}?page=0`,
    )

    return response.data.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

// 마감 임박 리스트 조회
export const getCloseList = async (category: EventCategory) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8080/api/events/operEnd/${category}?page=0`,
    )

    return response.data.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}
