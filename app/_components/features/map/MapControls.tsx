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
import { useMapFilterStore } from '@/app/_store/map/useMapFilterStore'
import { useMapStore } from '@/app/_store/map/useMapStore'
import { useEffect, useRef } from 'react'
import { useMapQuery } from './useMapQuery'

export const MapControlComponents = () => {
  const { data } = useMapQuery()
  const map = useMapStore((s) => s.map)
  const isListSheetShowing = useMapStore((s) => s.isListSheetShowing)
  const isSelectSheetShowing = useMapStore((s) => s.isSelectSheetShowing)
  const currentZoom = useMapStore((s) => s.currentZoom)
  const page = useMapFilterStore((s) => s.page)
  const latitude = useMapFilterStore((s) => s.latitude)
  const longitude = useMapFilterStore((s) => s.longitude)

  // 데이터가 한 번이라도 로드되었는지 추적
  const hasDataLoadedRef = useRef(false)
  useEffect(() => {
    if (data) {
      hasDataLoadedRef.current = true
    }
  }, [data])

  // 지도 중심 이동 추적 (라벨 렌더링 조건 충족 후 1km 이상 이동 시 위치 필터 업데이트 및 재조회)
  useMapCenterMovement(map)

  // 다음 페이지가 존재하는지 확인 (조건 4)
  const hasNextPage =
    data && data.totalPageCount ? page + 1 < data.totalPageCount : false

  // 라벨 마커가 보여지는 줌 레벨 확인
  const MIN_ZOOM_FOR_LABELS = 15
  const isLabelZoomLevel = currentZoom >= MIN_ZOOM_FOR_LABELS

  // 위치 필터가 설정되고, 라벨 줌 레벨이며, 다음 페이지가 있을 때만 LoadMoreButton 표시
  const shouldShowLoadMore =
    latitude !== null && longitude !== null && hasNextPage && isLabelZoomLevel

  return (
    <>
      {/* <ResearchButton /> */}
      {shouldShowLoadMore && <LoadMoreButton />}
      <CategoryFilterBox />
      <FilterButton />
      <CurrentButton />
      <CategoryDial />
      <FilterBox />
      {/* 데이터가 한 번이라도 로드되었으면 유지하여 재조회 중에도 언마운트되지 않도록 함 */}
      {hasDataLoadedRef.current && isListSheetShowing && <MapListBottomSheet />}
      {hasDataLoadedRef.current && isSelectSheetShowing && (
        <MapSelectBottomSheet />
      )}
    </>
  )
}
