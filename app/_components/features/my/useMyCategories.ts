import { getUserCategories, updateUserCategories } from './myApi'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { TEventCategory } from '@/app/_types'

const useMyCategories = () => {
  const queryClient = useQueryClient()

  const [selectedCategories, setSelectedCategories] = useState<
    TEventCategory[]
  >([])

  const { data } = useQuery({
    queryKey: ['user-interest'],
    queryFn: getUserCategories,
  })

  const updateCategoriesMutation = useMutation({
    mutationFn: () => updateUserCategories(selectedCategories),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-interest'],
      })
    },
  })

  useEffect(() => {
    if (data) {
      setSelectedCategories(data)
    }
  }, [data])

  const handleCategories = (category: TEventCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    )
  }

  return {
    selectedCategories,
    handleCategories,
    updateCategories: updateCategoriesMutation.mutate,
  }
}

export default useMyCategories
