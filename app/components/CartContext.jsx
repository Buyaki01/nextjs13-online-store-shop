import { useRouter } from "next/navigation"
import { createContext, useEffect, useState } from "react"

const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([])

  const router = useRouter()

  useEffect(() => {
    setCartProductsToState()
  }, [])

  const setCartProductsToState = () => {
    setCartProducts(
      localStorage.getItem('cartProducts') 
      ? JSON.parse(localStorage.getItem('cartProducts'))
      : []
    )
  }

  const addItemToCart = async ({
    id,
    productName,
    description,
    price,
    uploadedImagePaths,
    selectedCategory,
    properties,
    isFeatured
  }) => {
    const item = {
      id,
      productName,
      description,
      price,
      uploadedImagePaths,
      selectedCategory,
      properties,
      isFeatured
    }

    const itemExists = cartProducts?.find((cartItem) => cartItem._id === item._id)
    
    let newCartItems

    if (itemExists) {
      newCartItems = cart?.map((cartItem) => cartItem._id === itemExists._id ? item: cartItem) //If item exists, give old item data otherwise give new cart item in the loop
    } else {
      newCartItems = [...(cart || []), item]
    }

    localStorage.setItem("cartProducts", JSON.stringify({ newCartItems }))

    setCartProductsToState()
  }

  return <CartContext.Provider
    value={{ cartProducts, addItemToCart }}
  >
    {children}
  </CartContext.Provider>
}

export default CartContext