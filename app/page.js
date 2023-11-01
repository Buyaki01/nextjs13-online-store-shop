'use client'

import Link from "next/link"
import Featured from "./components/Featured"
import FlashSales from "./components/FlashSales"
import Header from "./components/Header"
import HotNewReleases from "./components/HotNewReleases"
import Products from "./components/Products"

export default function Home() {
  return (
    <main>
      <Header />
      <Featured />
      <HotNewReleases />
      <FlashSales />
      <Products />
    </main>
  )
}