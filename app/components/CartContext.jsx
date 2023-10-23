import { useRouter } from "next/navigation"
import { createContext, useState } from "react"

const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([])

  const router = useRouter()

  const addItemToCart = async ({
    _id,
    productName,
    description,
    price,
    uploadedImagePaths,
    selectedCategory,
    properties,
    isFeatured
  }) => {
    const item = {
      _id,
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
  }

  return <CartContext.Provider
    value={{ cartProducts }}
  >
    {children}
  </CartContext.Provider>
}