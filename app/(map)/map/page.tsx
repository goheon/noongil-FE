import { MapBox } from '@/app/_components'
import { CategoryDial } from '@/app/_components/features/map/category-dial/CategoryDial'
import { CurrentButton } from '@/app/_components/features/map/current-button/CurrentButton'
import { FilterButton } from '@/app/_components/features/map/filter-button/FilterButton'
import { CategoryFilterBox } from '@/app/_components/features/map/category-filter-box/CategoryFilterBox'
import { FilterBox } from '@/app/_components/features/map/filter-box/FilterBox'

const MapPage: React.FC = () => {
  return (
    <>
      <MapBox />
      <CategoryFilterBox />
      <FilterButton />
      <CurrentButton />
      <CategoryDial />
      <FilterBox />
    </>
  )
}

export default MapPage
