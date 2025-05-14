import { MapBox } from '@/app/_components'
import { CategoryDial } from '@/app/_components/features/map/category-dial/CategoryDial'
import { CurrentButton } from '@/app/_components/features/map/current-button/CurrentButton'
import { FilterButton } from '@/app/_components/features/map/filter-button/FilterButton'

const MapPage: React.FC = () => {
  return (
    <>
      <MapBox />
      <FilterButton />
      <CurrentButton />
      <CategoryDial />
    </>
  )
}

export default MapPage
