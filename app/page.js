'use client'

import Featured from "./components/Featured"
import FlashSales from "./components/FlashSales"
import Products from "./components/Products"
import ProductsCategories from "./components/ProductsCategories"

const Home = () => {
  return (
    <main>
      <Featured />
      <ProductsCategories />
      <FlashSales />
      <Products />
    </main>
  )
}

export default Home