'use client'

import { useSearchParams } from 'next/navigation'
import SearchList from '@/app/_components/features/searchList/SearchList/SearchList'

// TODO: list API 및 기획 완성시 수정

const ListsPage = () => {
  const searchParams = useSearchParams()
  const searchQuery = searchParams?.get('search')?.trim() || '' // 공백 제거 후 처리

  // 검색어가 없다면 전체 목록을 보여줌
  const isSearchEmpty = searchQuery === ''

  return (
    // <div>
    //   <h1>
    //     {isSearchEmpty ? '전체 게시물 목록' : `검색 결과: "${searchQuery}"`}
    //   </h1>
    //   {/* 검색어가 없을 때 전체 게시물 렌더링, 있을 때 검색 결과 렌더링 */}
    //   {isSearchEmpty ? (
    //     <p>전체 게시물을 표시합니다.</p>
    //   ) : (
    //     <p>{searchQuery}에 대한 검색 결과를 표시합니다.</p>
    //   )}
    //   {/* 게시물 렌더링 (실제 데이터를 기반으로 검색 결과나 전체 목록을 표시) */}
    // </div>
    <SearchList category="popup" />
  )
}

export default ListsPage
