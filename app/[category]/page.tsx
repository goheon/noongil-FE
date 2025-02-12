import { use } from 'react'
import { notFound } from 'next/navigation'
import { config } from '@/app/_lib'

const { VALID_CATEGORIES } = config

const CategoryPage = ({
  params,
}: {
  params: Promise<{ category: string }>
}) => {
  const { category } = use(params)

  // 유효한 카테고리가 아니면 404 페이지 렌더링
  if (!VALID_CATEGORIES.includes(category)) {
    notFound()
  }

  return (
    <div>
      <h1>{category} 카테고리 게시물 목록</h1>
      {/* 해당 카테고리의 게시물 목록을 렌더링 */}
    </div>
  )
}

export default CategoryPage
