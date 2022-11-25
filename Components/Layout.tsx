import React from 'react'
import Metatags from './Metatags'

const Layout = ({children}:any) => {
  return (
    <>
    <Metatags />
    <main>{children}</main>
    </>
  )
}

export default Layout