'use client'

import Link from "next/link"
import Featured from "./components/Featured"
import FlashSales from "./components/FlashSales"
import Header from "./components/Header"
import HotNewReleases from "./components/HotNewReleases"
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
    </main>
  )
}