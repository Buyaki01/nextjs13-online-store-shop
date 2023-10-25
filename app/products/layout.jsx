'use client'

import Header from "../components/Header"

const ProductLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default ProductLayout