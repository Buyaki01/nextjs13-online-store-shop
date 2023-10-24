'use client'

import { useRouter } from "next/navigation"
import { createContext, useEffect, useState } from "react"

const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([])

  const router = useRouter()

  // useEffect(() => {
  //   setCartProductsToState()
  // }, [])

  // const setCartProductsToState = () => {
  //   setCartProducts(
  //     localStorage.getItem('cartProducts') 
  //     ? JSON.parse(localStorage.getItem('cartProducts'))
  //     : []
  //   )
  // }

  const addItemToCart = async (productId) => {
    setCartProducts(prev => [...prev, productId])

    // localStorage.setItem("cartProducts", JSON.stringify({ newCartItems }))

    // setCartProductsToState()
  }

  return <CartContext.Provider
    value={{ cartProducts, addItemToCart }}
  >
    {children}
  </CartContext.Provider>
}

export default CartContext