import axios from 'axios'

// TOOD: main API 완성시 수정 필요

export const getPopularPopupList = async () => {
  try {
    const response = await axios.get(
      'http://127.0.0.1:8080/api/events/rcmn/ENBN',
    )

    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

export const getPopularExhibitionList = async () => {
  try {
    const response = await axios.get(
      'http://127.0.0.1:8080/api/events/rcmn/PPST',
    )

    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

export const getOpenList = async () => {
  try {
    const response = await axios.get(
      'http://127.0.0.1:8080/api/events/operStat/ENBN?page=0',
    )

    return response.data.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}

export const getCloseList = async () => {
  try {
    const response = await axios.get(
      'http://127.0.0.1:8080/api/events/operEnd/PPST?page=0',
    )

    return response.data.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}
