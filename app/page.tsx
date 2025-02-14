import Image from 'next/image'
import React from 'react'
import { NextPage } from 'next'
import MainPage from './_components/features/main/MainPage'

export const metadata = {
  title: '눈길 noongil',
  description: '...',
}

// TODO: 메인 페이지 category 업데이트

const Home: NextPage = () => {
  return (
    // <div className="">
    //   <h1>INDEX PAGE</h1>
    // </div>
    <MainPage />
  )
}

export default Home
