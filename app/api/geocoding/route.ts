import { NextResponse } from 'next/server'
import axios from 'axios'
import { config } from '@/app/_lib'

const NAVER_CLIENT_ID = config.NAVER_MAP_CLIENT_ID
const NAVER_CLIENT_KEY = config.NAVER_MAP_CLIENT_KEY

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const address = searchParams.get('query')

  if (!address) {
    return NextResponse.json({ error: '주소가 없습니다.' }, { status: 400 })
  }

  try {
    const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`
    const response = await axios.get(url, {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': NAVER_CLIENT_ID!,
        'X-NCP-APIGW-API-KEY': NAVER_CLIENT_KEY!,
      },
    })

    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json({ error: 'API 호출 실패' }, { status: 500 })
  }
}
