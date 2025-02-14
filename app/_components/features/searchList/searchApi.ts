import axios from 'axios'

export const getAllEventList = async (
  pageParam: number = 1,
  sortType: 10 | 20 | 30 = 10,
) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8080/api/events/list/${sortType}`,
      {
        params: {
          page: pageParam,
        },
      },
    )

    return response.data
  } catch (err) {
    console.log('err :', err)
    throw err
  }
}
