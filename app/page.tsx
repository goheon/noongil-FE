import React from 'react'
import { NextPage } from 'next'
import MainPage from './_components/features/main/MainPage'

export const metadata = {
  title: '눈길 noongil',
  description: '...',
}

const Home: NextPage = () => {
  return <MainPage category="all" />
}

export default Home
