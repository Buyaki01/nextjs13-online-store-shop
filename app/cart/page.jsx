'use client'

import { useContext, useEffect, useState } from "react"
import { CartContext } from "../components/CartContext"
import axios from "axios"
import Header from "../components/Header"
import toast from "react-hot-toast"
import EmptyCart from "../components/EmptyCart"
import CartItems from "../components/CartItems"
import CartSummary from "../components/CartSummary"

const Cart = () => {
  const { cartProducts } = useContext(CartContext) //The cartProducts will have: productId and quantity
  const [fetchCartProductInfo, setFetchCartProductInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await axios.post("/api/cart-products", { cartProducts })

        if (response.data.productsInCart) {
          setFetchCartProductInfo(response.data.productsInCart)
          setIsLoading(false)
        }
      } catch (error) {
        toast.error('An error occurred while fetching cart items.')
        setIsLoading(false)
      }
    }
    fetchCartProducts()

  }, [cartProducts])

  return (
    <>
      <Header />
      {isLoading ? (
        <p className="text-center text-2xl mt-5">Loading...</p>
      ) : cartProducts.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-4 gap-4 mb-5">
          <div className="col-span-3">
            <CartItems fetchCartProductInfo={fetchCartProductInfo} />
          </div>
          
          <div className="col-span-1">
            <CartSummary fetchCartProductInfo={fetchCartProductInfo} />
          </div>
        </div>
      )}
    </>
  )
}
export default Cart