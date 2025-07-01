'use client'

import CategoryFilter from '../searchList/SearchListFilter/CategoryFilter'
import LoadMoreButton from './load-more-button/LoadMoreButton'
import { CategoryFilterBox } from './category-filter-box/CategoryFilterBox'
import { FilterButton } from './filter-button/FilterButton'
import { CurrentButton } from './current-button/CurrentButton'
import { CategoryDial } from './category-dial/CategoryDial'
import { FilterBox } from './filter-box/FilterBox'
import { MapListBottomSheet } from './map-list-bottom-sheet/MapListBottomSheet'
import { MapSelectBottomSheet } from './map-select-bottom-sheet/MapSelectBottomSheet'

import { useMapQuery } from './useMapQuery'
import { useMapStore } from '@/app/_store/map/useMapStore'

export const MapControlComponents = () => {
  const { data } = useMapQuery()
  const isListSheetShowing = useMapStore((s) => s.isListSheetShowing)
  const isSelectSheetShowing = useMapStore((s) => s.isSelectSheetShowing)

  return (
    <>
      {/* <ResearchButton /> */}
      {/* <LoadMoreButton /> */}
      <CategoryFilterBox />
      <FilterButton />
      <CurrentButton />
      <CategoryDial />
      <FilterBox />
      {data && isListSheetShowing && <MapListBottomSheet />}
      {data && isSelectSheetShowing && <MapSelectBottomSheet />}
    </>
  )
}
