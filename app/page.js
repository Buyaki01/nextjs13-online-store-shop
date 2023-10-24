'use client'

import Featured from "./components/Featured"
import FlashSales from "./components/FlashSales"
import Header from "./components/Header"
import HotNewReleases from "./components/HotNewReleases"

export default function Home() {
  return (
    <main>
      <Header />
      <Featured />
      <HotNewReleases />
      <FlashSales />
    </main>
  )
}