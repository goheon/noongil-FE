import styles from './RegionFilter.module.scss'
import classNames from 'classnames/bind'
import FilterLayout from './FilterLayout'
import { Checkbox } from '@/app/_components/ui'
import { useListFilterStore } from '@/app/_store/listFilter/useListFilterStore'
import { SEOUL_REGION_LIST } from '@/app/_constants/region'

const cx = classNames.bind(styles)

interface RegionFilterProps {
  isExhibitionPage: boolean
}

const RegionFilter = (props: RegionFilterProps) => {
  const { isExhibitionPage } = props

  const {
    isSeoulChecked,
    isGyeonggiChecked,
    setSeoulCheck,
    setGyenggiCheck,
    regions,
    setRegion,
  } = useListFilterStore()

  return (
    <FilterLayout isExhibitionPage={isExhibitionPage}>
      <div className={cx('container')}>
        <div className={cx('section')}>
          <Checkbox
            value={'seoul'}
            label="서울"
            onChange={() => setSeoulCheck(!isSeoulChecked)}
            checked={isSeoulChecked}
            isExhibitionPage={isExhibitionPage}
          />
          <Checkbox
            value={'gyeonggi'}
            label="경기"
            onChange={() => setGyenggiCheck(!isGyeonggiChecked)}
            checked={isGyeonggiChecked}
            isExhibitionPage={isExhibitionPage}
          />
        </div>

        <div className={cx('divider')} />

        <div className={cx('section')}>
          {isSeoulChecked && (
            <>
              {SEOUL_REGION_LIST.map((regionData) => (
                <Checkbox
                  key={regionData.rgntCd}
                  value={regionData.rgntCd}
                  label={regionData.regionName}
                  isExhibitionPage={isExhibitionPage}
                  onChange={() => setRegion(regionData.rgntCd)}
                  checked={regions.includes(regionData.rgntCd)}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </FilterLayout>
  )
}

export default RegionFilter
