import { NextResponse } from 'next/server'
import axios from 'axios'
import { config } from '@/app/_lib'

const NAVER_CLIENT_ID = config.NAVER_MAP_CLIENT_ID
const NAVER_CLIENT_KEY = config.NAVER_MAP_CLIENT_KEY

const headers = {
  'X-NCP-APIGW-API-KEY-ID': NAVER_CLIENT_ID!,
  'X-NCP-APIGW-API-KEY': NAVER_CLIENT_KEY!,
}

// 주소 → 좌표 변환
const fetchCoordinates = async (address: string) => {
  const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode`
  const res = await axios.get(url, {
    headers,
    params: { query: address },
  })

  const { addresses } = res.data
  if (!addresses || addresses.length === 0) {
    throw new Error('좌표를 찾을 수 없습니다.')
  }

  const { x, y, roadAddress, jibunAddress } = addresses[0]
  return { x, y, roadAddress, jibunAddress }
}

// 좌표 → 법정동 코드 변환
const fetchLegalCode = async (x: string, y: string) => {
  const url = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc`
  const res = await axios.get(url, {
    headers,
    params: {
      coords: `${x},${y}`,
      sourcecrs: 'EPSG:4326',
      orders: 'legalcode',
      output: 'json',
    },
  })

  const { results } = res.data
  if (!results || results.length === 0) {
    throw new Error('법정동 코드를 찾을 수 없습니다.')
  }

  return results[0].code
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const address = searchParams.get('query')

  if (!address) {
    return NextResponse.json({ error: '주소가 없습니다.' }, { status: 400 })
  }

  try {
    const { x, y, roadAddress, jibunAddress } = await fetchCoordinates(address)
    const legalCode = await fetchLegalCode(x, y)

    return NextResponse.json({
      roadAddress,
      jibunAddress,
      x,
      y,
      legalCode,
    })
  } catch (error: any) {
    console.error('주소 처리 오류:', error.message)
    return NextResponse.json(
      { error: error.message || 'API 호출 실패' },
      { status: 500 },
    )
  }
}
