import React from 'react'
import Header from '../common/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../common/Footer'

const LayOut = () => {
  return (
  <>
        <Header />
      <main>

        <Outlet />
      </main>

      <Footer />
  </>
  )
}

export default LayOut