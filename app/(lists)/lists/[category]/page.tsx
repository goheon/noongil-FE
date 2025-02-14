'use client'

import { use } from 'react'
import { notFound, useSearchParams } from 'next/navigation'
import { config } from '@/app/_lib'
import SearchList from '@/app/_components/features/searchList/SearchList/SearchList'

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

  return (
    // <div>
    //   <h1>{category} 카테고리</h1>
    //   <div>
    //     <h1>
    //       {isSearchEmpty ? '전체 게시물 목록' : `검색 결과: "${searchQuery}"`}
    //     </h1>
    //     {/* 검색어가 없을 때 전체 게시물 렌더링, 있을 때 검색 결과 렌더링 */}
    //     {isSearchEmpty ? (
    //       <p>전체 게시물을 표시합니다.</p>
    //     ) : (
    //       <p>{searchQuery}에 대한 검색 결과를 표시합니다.</p>
    //     )}
    //     {/* 게시물 렌더링 (실제 데이터를 기반으로 검색 결과나 전체 목록을 표시) */}
    //   </div>
    // </div>
    <SearchList category={category} />
  )
}

export default CategoryPage
