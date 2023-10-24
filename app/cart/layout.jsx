'use client'

import Header from "../components/Header"

const CartLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default CartLayout
