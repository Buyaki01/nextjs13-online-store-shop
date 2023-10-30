'use client'

import Featured from "./components/Featured"
import FlashSales from "./components/FlashSales"
import Header from "./components/Header"
import HotNewReleases from "./components/HotNewReleases"
import Products from "./components/Products"
import Login from "./login/page"
import Register from "./register/page"

export default function Home() {
  return (
    <main>
      <Register />
      <Login />
      <Header />
      <Featured />
      <HotNewReleases />
      <FlashSales />
      <Products />
    </main>
  )
}