import { MapBox } from '@/app/_components'
import { CategoryDial } from '@/app/_components/features/map/category-dial/CategoryDial'
import { CurrentButton } from '@/app/_components/features/map/current-button/CurrentButton'

const MapPage: React.FC = () => {
  return (
    <>
      <MapBox />
      <CurrentButton />
      <CategoryDial />
    </>
  )
}

export default MapPage
