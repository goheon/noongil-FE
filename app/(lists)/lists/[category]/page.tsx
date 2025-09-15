'use client'

import { use } from 'react'
import { notFound, useSearchParams } from 'next/navigation'
import { config } from '@/app/_lib'
import SearchList from '@/app/_components/features/searchList/SearchList/SearchList'
import { SpeedDial } from '@/app/_components'
import SearchListFilter from '@/app/_components/features/searchList/SearchListFilter/SearchListFilter'

const { VALID_CATEGORIES } = config

// TODO: list API 및 기획 완성시 수정

const CategoryPage = ({
  params,
}: {
  params: Promise<{ category: string }>
}) => {
  const { category } = use(params)

  const searchParams = useSearchParams()
  const searchQuery = searchParams?.get('search')?.trim() || '' // 공백 제거 후 처리

  // 검색어가 없다면 전체 목록을 보여줌
  const isSearchEmpty = searchQuery === ''

  // 유효한 카테고리가 아니면 404 페이지 렌더링
  if (!VALID_CATEGORIES.includes(category)) {
    notFound()
  }

  const uniqueKey = new URLSearchParams(searchParams).toString()

  return (
    <>
      {/* fix categort type */}
      <SearchList
        key={uniqueKey}
        eventCode={category as 'popup' | 'exhibition' | 'all'}
      />
      <SpeedDial />
      <SearchListFilter
        eventCode={category as 'popup' | 'exhibition' | 'all'}
      />
    </>
  )
}

export default CategoryPage
