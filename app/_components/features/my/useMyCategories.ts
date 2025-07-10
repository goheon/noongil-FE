import { getUserCategories, updateUserCategories } from './myApi'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState, useMemo } from 'react'
import {
  TEventCategory,
  TPopupCategory,
  TExhibitionCategory,
} from '@/app/_types'
import {
  POPUP_CATEGORY_VALUES,
  EXHIBITION_CATEGORY_VALUES,
} from '@/app/_constants/event'
import debounce from 'lodash/debounce'
import { useSnackbar } from '../../common/snackbar/useSnackbar'

const useMyCategories = () => {
  const queryClient = useQueryClient()

  const { showSnackbar } = useSnackbar()

  const [selectedPopupCategories, setSelectedPopupCategories] = useState<
    TPopupCategory[]
  >([])
  const [selectedExhibitionCategories, setSelectedExhibitionCategories] =
    useState<TExhibitionCategory[]>([])

  const { data } = useQuery({
    queryKey: ['user-interest'],
    queryFn: getUserCategories,
  })

  const debouncedUpdate = useMemo(
    () =>
      debounce(() => {
        updateCategoriesMutation.mutate()
      }, 500),
    [selectedPopupCategories, selectedExhibitionCategories],
  )

  const updateCategoriesMutation = useMutation({
    mutationFn: () =>
      updateUserCategories([
        ...selectedPopupCategories,
        ...selectedExhibitionCategories,
      ]),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-interest'],
      })
    },
  })

  const handleFetchedCategories = (categories: TEventCategory[]) => {
    const popupCategories = categories.filter(
      (category): category is TPopupCategory =>
        POPUP_CATEGORY_VALUES.includes(category as TPopupCategory),
    )

    const exhibitionCategories = categories.filter(
      (category): category is TExhibitionCategory =>
        EXHIBITION_CATEGORY_VALUES.includes(category as TExhibitionCategory),
    )

    setSelectedPopupCategories(popupCategories)
    setSelectedExhibitionCategories(exhibitionCategories)
  }

  useEffect(() => {
    if (data) {
      handleFetchedCategories(data)
    }
  }, [data])

  // 공통 토글 함수
  const toggleCategory = <T extends string>(
    category: T,
    prev: T[],
    limit: number = 3,
  ): T[] => {
    const isSelected = prev.includes(category)

    if (isSelected) {
      return prev.filter((c) => c !== category)
    }

    if (prev.length >= limit) {
      showSnackbar({
        message: '카테고리별 3개까지 지정할 수 있습니다.',
        type: 'info',
        duration: 2000,
      })
      return prev
    }

    return [...prev, category]
  }

  const handlePopupCategories = (category: TPopupCategory) => {
    setSelectedPopupCategories((prev) => {
      const updated = toggleCategory(category, prev)
      debouncedUpdate()
      return updated
    })
  }

  const handleExhibitionCategories = (category: TExhibitionCategory) => {
    setSelectedExhibitionCategories((prev) => {
      const updated = toggleCategory(category, prev)
      debouncedUpdate()
      return updated
    })
  }
  return {
    updateCategories: updateCategoriesMutation.mutate,
    selectedPopupCategories,
    selectedExhibitionCategories,
    handlePopupCategories,
    handleExhibitionCategories,
  }
}

export default useMyCategories
