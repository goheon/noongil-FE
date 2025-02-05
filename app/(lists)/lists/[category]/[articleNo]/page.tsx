'use client'

import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'

export default function ArticlePage() {
  const params = useParams()
  const category = params?.category as string
  const articleNo = params?.articleNo as string

  console.log(category, articleNo)
  // 유효한 카테고리 검증 (필요에 따라 수정 가능)
  const VALID_CATEGORIES = ['popup', 'exhibition'] // 예제용 (실제 데이터에 맞게 수정)
  if (!VALID_CATEGORIES.includes(category)) {
    notFound()
  }

  return (
    <div>
      <h1>
        {category} 카테고리의 게시물 {articleNo}
      </h1>
      <p>게시물 내용을 불러오는 중...</p>
    </div>
  )
}
