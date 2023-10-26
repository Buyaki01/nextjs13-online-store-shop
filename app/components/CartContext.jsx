'use client'

import { createContext, useEffect, useState } from "react"

export const CartContext = createContext({})

export function CartContextProvider({children}) {
  const ls = typeof window !== "undefined" ? window.localStorage : null
  const [cartProducts,setCartProducts] = useState([])

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts))
    }
  }, [cartProducts])

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')))
    }
  }, [])

  function addItemToCart(productId) {
    const existingProductIndex = cartProducts.findIndex((item) => item.productId === productId)

    if (existingProductIndex !== -1) {
      // If it's in the cart, update the quantity
      const updatedCart = [...cartProducts]
      updatedCart[existingProductIndex].quantity += 1
      setCartProducts(updatedCart)
    } else {
      // If it's not in the cart, add it
      setCartProducts([...cartProducts, { productId, quantity: 1 }])
    }
  }

  function decrementItemInCart(productId) {
    const existingProductIndex = cartProducts.findIndex((item) => item.productId === productId)

    if (existingProductIndex !== -1) {
      const updatedCart = [...cartProducts]
      updatedCart[existingProductIndex].quantity -= 1

      if (updatedCart[existingProductIndex].quantity <= 0) {
        // If quantity reaches zero, remove the product from the cart
        updatedCart.splice(existingProductIndex, 1)
      }

      setCartProducts(updatedCart)
    }
  }
  
  return (
    <CartContext.Provider value={{ cartProducts, addItemToCart, decrementItemInCart }}>
      {children}
    </CartContext.Provider>
  );
}