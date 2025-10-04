'use client'

import { CategoryDial } from './category-dial/CategoryDial'
import { CategoryFilterBox } from './category-filter-box/CategoryFilterBox'
import { CurrentButton } from './current-button/CurrentButton'
import { FilterBox } from './filter-box/FilterBox'
import { FilterButton } from './filter-button/FilterButton'
import LoadMoreButton from './load-more-button/LoadMoreButton'
import { MapListBottomSheet } from './map-list-bottom-sheet/MapListBottomSheet'
import { MapSelectBottomSheet } from './map-select-bottom-sheet/MapSelectBottomSheet'

import { useMapCenterMovement } from '@/app/_store/map/MapHooks'
import { useMapStore } from '@/app/_store/map/useMapStore'
import { useMapFilterStore } from '@/app/_store/map/useMapFilterStore'
import { useMapQuery } from './useMapQuery'

export const MapControlComponents = () => {
  const { data } = useMapQuery()
  const map = useMapStore((s) => s.map)
  const isListSheetShowing = useMapStore((s) => s.isListSheetShowing)
  const isSelectSheetShowing = useMapStore((s) => s.isSelectSheetShowing)
  const isLoadmoreShowing = useMapStore((s) => s.isLoadmoreShowing)
  const page = useMapFilterStore((s) => s.page)

  // 지도 중심 이동 추적 (라벨 렌더링 조건 충족 후 1km 이상 이동 시 LoadMoreButton 표시)
  useMapCenterMovement(map)

  // 다음 페이지가 존재하는지 확인
  const hasNextPage = data && data.totalPageCount ? page + 1 < data.totalPageCount : false
  const shouldShowLoadMore = data && isLoadmoreShowing && hasNextPage

  return (
    <>
      {/* <ResearchButton /> */}
      {shouldShowLoadMore && <LoadMoreButton />}
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
