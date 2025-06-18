export interface IRegionData {
  rgntCd: string
  regionName: string
}

export const SEOUL_REGIONS: Record<string, IRegionData> = {
  '10': {
    rgntCd: '10',
    regionName: '홍대입구',
  },
  '20': {
    rgntCd: '20',
    regionName: '성수',
  },
  '30': {
    rgntCd: '30',
    regionName: '여의도',
  },
  '40': {
    rgntCd: '40',
    regionName: '잠실',
  },
  '50': {
    rgntCd: '50',
    regionName: '종로',
  },
  '60': {
    rgntCd: '60',
    regionName: '명동',
  },
  '70': {
    rgntCd: '70',
    regionName: '한남',
  },
  '80': {
    rgntCd: '80',
    regionName: '강남',
  },
}

export const SEOUL_REGION_LIST: IRegionData[] = Object.values(SEOUL_REGIONS)
