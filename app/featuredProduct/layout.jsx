'use client'

import Header from "../components/Header"

const FeaturedProductsLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default FeaturedProductsLayout