import Header from '@/app/components/header/Header'
import React from 'react'

const MainLayout = ({children}:any) => {
  return (
    <>
    <Header/>
    {children}
    </>
  )
}

export default MainLayout