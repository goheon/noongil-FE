'use client'

import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'

import { config } from '@/app/_lib'
import EventInfo from '@/app/_components/features/eventInfo/EventInfo'

const { VALID_CATEGORIES } = config

export default function ArticlePage() {
  const params = useParams()
  const category = params?.category as string
  const articleNo = params?.articleNo as string

  // 유효한 카테고리 검증 (필요에 따라 수정 가능)
  if (!VALID_CATEGORIES.includes(category)) {
    notFound()
  }

  return <EventInfo id={articleNo} />
}
