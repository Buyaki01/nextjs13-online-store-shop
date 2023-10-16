'use client'

import Header from "../components/Header"

export default function ProductsLayout({ children }) {

  return (
    <>
      <Header />
      {children}
    </>
  )
}
