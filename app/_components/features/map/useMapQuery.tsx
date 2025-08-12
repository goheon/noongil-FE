import { useQuery } from '@tanstack/react-query'
import { searchMapInfo } from './mapSearchApi'
import { useMapFilterStore } from '@/app/_store/map/useMapFilterStore'

export const useMapQuery = () => {
  const selectedCategories = useMapFilterStore((s) => s.selectedCategories)
  const selectedType = useMapFilterStore((s) => s.selectedType)
  const selectedDateType = useMapFilterStore((s) => s.selectedDateType)
  const selectedDates = useMapFilterStore((s) => s.selectedDates)
  const page = useMapFilterStore((s) => s.page)

  const filter = {
    selectedCategories,
    selectedType,
    selectedDateType,
    selectedDates,
    page,
  }

  return useQuery({
    queryKey: ['map', filter],
    queryFn: () => searchMapInfo(filter),
  })
}
