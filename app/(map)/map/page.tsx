import { MapBox } from '@/app/_components'

import { MapControlComponents } from '@/app/_components/features/map/MapControls'
import { useMapQuery } from '@/app/_components/features/map/useMapQuery'
import { useMapStore } from '@/app/_store/map/useMapStore'

const MapPage: React.FC = () => {
  return (
    <>
      <MapBox />
      <MapControlComponents />
    </>
  )
}

export default MapPage
