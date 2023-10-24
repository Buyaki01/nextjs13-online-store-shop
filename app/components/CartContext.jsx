'use client'

import { createContext, useEffect, useState } from "react"

const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([])

  useEffect(() => {
    // Load the cart from localStorage when the component mounts
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCartProducts(JSON.parse(storedCart))
    }
  }, [])

  const addItemToCart = (productId) => {
    setCartProducts((prevCart) => [...prevCart, productId]);
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }, [cartProducts])

  return <CartContext.Provider
    value={{ cartProducts, addItemToCart }}
  >
    {children}
  </CartContext.Provider>
}

export default CartContext