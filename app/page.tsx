import React from 'react'
import { NextPage } from 'next'
import { SpeedDial } from './_components'
import MainPage from './_components/features/main/MainPage'

const Home: NextPage = () => {
  return (
    <>
      <MainPage eventCode="all" />
      <SpeedDial />
    </>
  )
}

export default Home
