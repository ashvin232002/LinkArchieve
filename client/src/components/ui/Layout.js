import React from 'react'
import NavBar from './Navbar'
import Footer from "./Footer"

function Layout({children}) {
  return (
   <>
        <NavBar/>
      <div
        style={{
          // marginBottom:"4rem"
        }}
      />
        <main>{children}</main>
          <Footer/>
   </>
  )
}

export default Layout