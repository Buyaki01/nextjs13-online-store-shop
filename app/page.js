'use client'

import Featured from "./components/Featured"
import FlashSales from "./components/FlashSales"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Products from "./components/Products"
import ProductsCategories from "./components/ProductsCategories"

export default function Home() {
  return (
    <main>
      <Header />
      <Featured />
      <ProductsCategories />
      <FlashSales />
      <Products />
      <Footer />
    </main>
  )
}