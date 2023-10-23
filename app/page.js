'use client'

import { CartContextProvider } from "./components/CartContext"
import Featured from "./components/Featured"
import FlashSales from "./components/FlashSales"
import Header from "./components/Header"
import HotNewReleases from "./components/HotNewReleases"

export default function Home() {
  return (
    <main>
      <CartContextProvider>
        <Header />
        <Featured />
        <HotNewReleases />
        <FlashSales />
      </CartContextProvider>
    </main>
  )
}