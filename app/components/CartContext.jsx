'use client'

import { useRouter } from "next/navigation"
import { createContext, useEffect, useState } from "react"

const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState(() => {
    const storedCart = localStorage.getItem('cart')
    return storedCart ? JSON.parse(storedCart) : []
  })

  const router = useRouter()

  const addItemToCart = async (productId) => {
    const updatedCart = [...cartProducts, productId]
    setCartProducts(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  return <CartContext.Provider
    value={{ cartProducts, addItemToCart }}
  >
    {children}
  </CartContext.Provider>
}

export default CartContext