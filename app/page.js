'use client'

import Featured from "./components/Featured"
import FlashSales from "./components/FlashSales"
import Products from "./components/Products"
import ProductsCategories from "./components/ProductsCategories"

export default function Home() {
  return (
    <main>
      <Featured />
      <ProductsCategories />
      <FlashSales />
      <Products />
    </main>
  )
}