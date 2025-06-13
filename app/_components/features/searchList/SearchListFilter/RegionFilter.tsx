import styles from './RegionFilter.module.scss'
import classNames from 'classnames/bind'
import FilterLayout from './FilterLayout'
import { Checkbox } from '@/app/_components/ui'
import { useListFilterStore } from '@/app/_store/listFilter/useListFilterStore'
import { useMemo } from 'react'
import { regionGroupMap, RegionGroupCode } from '../type'

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
    regionFilter,
  } = useListFilterStore()

  const regionGroupKeys = useMemo(
    () =>
      regionFilter ? (Object.keys(regionFilter) as RegionGroupCode[]) : [],
    [regionFilter],
  )

  return (
    <FilterLayout isExhibitionPage={isExhibitionPage}>
      <div className={cx('container')}>
        <div className={cx('section')}>
          {regionGroupKeys.map((groupCode) => {
            const checked =
              groupCode === '10'
                ? isSeoulChecked
                : groupCode === '20'
                  ? isGyeonggiChecked
                  : false

            const setChecked =
              groupCode === '10'
                ? setSeoulCheck
                : groupCode === '20'
                  ? setGyenggiCheck
                  : () => {}

            return (
              <Checkbox
                key={groupCode}
                value={groupCode}
                label={regionGroupMap[groupCode] ?? groupCode}
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                isExhibitionPage={isExhibitionPage}
              />
            )
          })}
        </div>

        <div className={cx('divider')} />

        <div className={cx('section')}>
          {regionGroupKeys.map((groupCode) => {
            const isChecked =
              groupCode === '10'
                ? isSeoulChecked
                : groupCode === '20'
                  ? isGyeonggiChecked
                  : false

            if (!isChecked) return null

            const regionList = regionFilter?.[groupCode] ?? []

            return (
              <div key={groupCode} className={cx('item-list')}>
                {regionList.map((geoData) => (
                  <Checkbox
                    key={geoData.rgntCd}
                    value={geoData.rgntCd}
                    label={geoData.regionName}
                    checked={regions.some((r) => r.rgntCd === geoData.rgntCd)}
                    onChange={() => setRegion(geoData)}
                    isExhibitionPage={isExhibitionPage}
                  />
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </FilterLayout>
  )
}

export default RegionFilter
