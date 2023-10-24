'use client'

import { createContext, useState } from "react"

const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState(() => {
    const storedCart = localStorage.getItem('cart')
    return storedCart ? JSON.parse(storedCart) : []
  })

  const addItemToCart = async (productId) => {
    const updatedCart = [...cartProducts, productId]
    console.log(updatedCart)
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