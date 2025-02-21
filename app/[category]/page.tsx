import { use } from 'react'
import { notFound } from 'next/navigation'
import { config } from '@/app/_lib'
import MainPage from '../_components/features/main/MainPage'

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

  return <MainPage category={category as 'popup' | 'exhibition'} />
}

export default CategoryPage
