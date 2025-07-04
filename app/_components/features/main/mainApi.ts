import { axiosApi } from '@/app/_lib/axios'
import { TAllEventCode } from '@/app/_types'
import { IUserRecommendListResponse } from './type'

// TOOD: main API 완성시 수정 필요

// TOP 배너 추천 리스트 가져오기
export const getBannerEvent = async (category: TAllEventCode) => {
  try {
    const response = await axiosApi.get(`main-event/banner/${category}`)

    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

// 인기 리스트 조회
export const getPopularList = async (category: TAllEventCode) => {
  try {
    const response = await axiosApi.get(`main-event/rank/${category}`)

    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

// 오픈 임박 리스트 조회
export const getOpenList = async (category: TAllEventCode) => {
  try {
    const response = await axiosApi.get(
      `main-events/operStat/${category}?page=0`,
    )

    return response.data.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

// 마감 임박 리스트 조회
export const getCloseList = async (category: TAllEventCode) => {
  try {
    const response = await axiosApi.get(
      `main-events/operEnd/${category}?page=0`,
    )

    return response.data.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

// 유저 추천 리스트 조회
export const getUserRecommendList = async (
  category: TAllEventCode,
): Promise<IUserRecommendListResponse> => {
  try {
    const response = await axiosApi.get(`main-events/rcmn/${category}`)

    return response.data
  } catch (err) {
    console.log('user recommend list :', err)
    throw err
  }
}
