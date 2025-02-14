import { getPopularExhibitionList, getPopularPopupList } from '../mainApi'
import { useQuery } from '@tanstack/react-query'

// TODO: API 완료시 수정 필요

const usePopularList = () => {
  const {
    isPending: isPopupLoading,
    error: popupError,
    data: popupData = [],
  } = useQuery({
    queryKey: ['popular-popup'],
    queryFn: getPopularPopupList,
  })

  const {
    isPending: isExhibitionLoading,
    error: exhibitionError,
    data: exhibitionData = [],
  } = useQuery({
    queryKey: ['popular-exhibition'],
    queryFn: getPopularExhibitionList,
  })

  return {
    isPopupLoading,
    popupError,
    popupData,
    isExhibitionLoading,
    exhibitionError,
    exhibitionData,
  }
}

export default usePopularList
