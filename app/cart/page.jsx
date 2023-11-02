'use client'

import { useContext, useEffect, useState } from "react"
import { CartContext } from "../components/CartContext"
import axios from "axios"
import Link from "next/link"
import Header from "../components/Header"

const Cart = () => {
  const { cartProducts, addItemToCart, decrementItemInCart, removeItemFromCart } = useContext(CartContext) //The cartProducts will have: productId and quantity
  const [fetchCartProductInfo, setFetchCartProductInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalPrice, setTotalPrice] = useState(0)
  
  useEffect(() => {
    // Create an array to store the fetched products
    const fetchedProducts = []

    const fetchProducts = async () => {
      try {
        // Use Promise.all to fetch product data for all product IDs in cartProducts
        const productPromises = cartProducts.map((item) => axios.get(`/api/products/${item.productId}`))

        const responses = await Promise.all(productPromises);
        const productsData = responses.map((response) => response.data.product)

        fetchedProducts.push(...productsData)
        setFetchCartProductInfo(fetchedProducts)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching product data:", error)
        setIsLoading(false)
      }
    }

    if (cartProducts.length > 0) {
      fetchProducts()
    } else {
      setIsLoading(false)
    }

    let cartTotalPrice = 0

    if (fetchCartProductInfo && fetchCartProductInfo.length > 0) {
      fetchCartProductInfo.forEach(product => {
        const cartItem = cartProducts.find(item => item.productId === product._id)
        if (cartItem) {
          const itemPrice = product.price * cartItem.quantity
          cartTotalPrice += itemPrice
        }
      })
    }

    setTotalPrice(cartTotalPrice)
  }, [cartProducts, fetchCartProductInfo])

  return (
    <>
      <Header />
      <div className="mb-5">
        {isLoading 
          ? (
              <p className="mt-5 text-2xl text-center">Loading...</p>
            ) 
          : (
            cartProducts?.length > 0 
              ? (
                <div className="grid grid-cols-4 gap-4 mb-5">
                  <div className="col-span-3 mt-3 border border-solid border-gray-400 rounded-sm p-3">
                    <h2 className="text-2xl font-bold mb-3">Cart</h2>
                    {fetchCartProductInfo && fetchCartProductInfo.length > 0 && fetchCartProductInfo.map(product => (
                      <div className="mt-3 grid grid-cols-5 gap-4 border-b-2 border-gray-400 pb-3 mb-1">
                        <div className="p-3 mr-3 border border-r-2 border-solid border-gray-300 flex items-center justify-center"> 
                          <Link href={`/products/${product._id}`}>
                            <img 
                              src={product.uploadedImagePaths[0]} 
                              alt={product.productName} 
                              className="w-full h-32 object-contain"
                            />
                          </Link>
                        </div>
                      
                        <Link 
                          href={`/products/${product._id}`}
                          className="w-44 mr-3 flex items-center justify-center"
                        >
                          <h3 className="font-bold text-xl truncate px-1">
                            {product.productName}
                          </h3>
                        </Link>
                        
                        <div className="w-32 mr-3 flex items-center justify-center">
                          <button 
                            className="border text-2xl px-2 text-white w-9 h-9 flex justify-center rounded"
                            onClick={() => {
                              decrementItemInCart(product._id)
                            }}
                          >
                            -
                          </button>
                          <span className="text-xl mx-2">{cartProducts.find(item => item.productId === product._id)?.quantity }</span>
                          <button 
                            className="border text-2xl px-2 text-white w-9 h-9 flex justify-center rounded"
                            onClick={() => {
                              addItemToCart(product._id)
                            }}
                          >
                            +
                          </button>
                        </div>
                        <div className="w-32 mr-3 flex flex-col items-center justify-center">
                          <h4 className="text-2xl font-bold">Ksh.{product.price * cartProducts.find((item) => item.productId === product._id)?.quantity }</h4>
                          <p className="text-sm whitespace-nowrap"><span className="font-bold">Ksh.{product.price}</span>/per item</p>
                        </div>
                        <div className="w-32 flex items-center justify-center">
                          <button 
                            className="bg-red-500 text-white py-2 px-4 rounded-full flex gap-2"
                            onClick={() => {
                              removeItemFromCart(product._id)
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
            
                  <div className="col-span-1 mt-3 border border-solid border-gray-400 rounded-sm p-3 h-52">
                    <h2 className="text-2xl font-semibold mb-3">Cart Summary</h2>
                    <p className="text-lg mb-3">Total Amount: <span className="font-semibold text-xl">ksh.{totalPrice}</span></p>
                    <div className="text-sm text-gray-600 mb-3">
                      (Taxes and Delivery charges will be added in the checkout page)
                    </div>
                    <div className="text-center">
                      <button className="text-white text-lg py-2 px-4 rounded-md focus:outline-none">
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              ) 
              : (
                <div className="flex flex-col items-center justify-center">
                  <p className="mt-5 text-2xl">Your cart is empty!</p>
                  <div className="mt-5">
                    <Link 
                      href={'/'}
                      className="text-xl font-bold text-secondary flex gap-1 items-center justify-center hover:underline"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                      </svg>Start Shopping
                    </Link> 
                  </div>
                </div>
              )
            )
        }
      </div>
    </>
  )
}
export default Cart