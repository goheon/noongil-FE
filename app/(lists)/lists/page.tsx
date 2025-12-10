'use client'

import SearchList from '@/app/_components/features/searchList/SearchList/SearchList'
import { SpeedDial } from '@/app/_components'
import SearchListFilter from '@/app/_components/features/searchList/SearchListFilter/SearchListFilter'
import { useSearchParams } from 'next/navigation'

// TODO: list API 및 기획 완성시 수정

const ListsPage = () => {
  const searchParams = useSearchParams()
  const searchQuery = searchParams?.get('search')?.trim() || '' // 공백 제거 후 처리

  // 검색어가 없다면 전체 목록을 보여줌
  // const isSearchEmpty = searchQuery === ''

  const uniqueKey = new URLSearchParams(searchParams).toString()

  return (
    <>
      <SearchList key={uniqueKey} eventCode="all" />
      <SpeedDial />
      <SearchListFilter eventCode="all" />
    </>
  )
}

export default ListsPage
