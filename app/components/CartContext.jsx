'use client'

import { createContext, useState, useEffect } from "react"

const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart')
      if (storedCart) {
        setCartProducts(JSON.parse(storedCart))
      }

      setLoading(false)
    }
  }, [])

  const addItemToCart = (productId) => {
    const updatedCart = [...cartProducts, productId]

    setCartProducts(updatedCart)

    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
  }

  return (
    <CartContext.Provider value={{ cartProducts, addItemToCart }}>
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        children
      )}
    </CartContext.Provider>
  )
}

export default CartContext
