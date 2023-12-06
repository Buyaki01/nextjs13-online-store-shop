'use client'

import CartIcon from "@/app/components/CartIcon"
import axios from "axios"
import { useParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { CartContext } from "@/app/components/CartContext"
import Link from "next/link"

const Product = () => {
  const params = useParams()
  const { id } = params
  const { cartProducts, addItemToCart, decrementItemInCart } = useContext(CartContext)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`/api/products/${id}`)
      setProduct(response.data.product)
      setLoading(false)
    }

    fetchProduct()
  }, [id])

  useEffect(() => {
    const isProductInCart = cartProducts.some((item) => item.productId === id)
    setAddedToCart(isProductInCart)

  }, [cartProducts, id])

  return (
    <>
      <div>
        {loading 
          ? (
              <h1 className="mt-3 text-xl text-center">Loading...</h1>
            ) 
          : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
              <div className="border-solid border border-gray-400 rounded-sm">
                <Swiper
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                  }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className='h-96 w-full rounded-lg'
                >
                  {product.uploadedImagePaths.length > 0 && product.uploadedImagePaths.map((imagePath, index) => (
                    <SwiperSlide key={index}>
                      <div className='flex h-full w-full items-center justify-center'>
                        <img
                          src={imagePath}
                          alt={product.productName}
                          className='flex justify-center'
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                
                {/* Thumbnail */}
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
                >
                  {product.uploadedImagePaths.length > 0 && product.uploadedImagePaths.map((imagePath, index) => (
                    <SwiperSlide key={index}>
                      <div className='flex h-full w-full items-center justify-center'>
                        <img
                          src={imagePath}
                          alt={product.productName}
                          className='w-full h-full'
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="flex flex-col items-center justify-center h-full p-5 text-justify">
                <div className="text-justify">
                  <p className="text-lg text-gray-600 text-justify"><span className="font-bold">Product Name:</span> {product.productName}</p>
                  <p className="text-lg text-gray-600"><span className="font-bold">Description:</span> {product.description}</p>
                  <p className="text-lg text-gray-600"><span className="font-bold">Category:</span> {product.selectedCategory.name}</p>
                  <p className="text-lg text-gray-600"><span className="font-bold">Brand:</span> {product.brand.brandName}</p>
                  <p className="text-lg text-gray-600 font-bold mb-2">Price: <span className="text-primary">shs.{product.productPrice}</span></p>
                  {/* <p className="text-lg text-gray-600 text-justify mb-3"><span className="font-bold">Quantity:</span> {product.quantityInStock}</p> */}
                </div>

                {addedToCart 
                  ? (
                    <> 
                      <div className="flex gap-2 mb-5">
                        <div className="flex mb-3">
                          <button 
                            className="border text-2xl px-2 text-white w-9 h-9 flex justify-center rounded"
                            onClick={() => {
                              decrementItemInCart(product._id)
                            }}
                          >-
                          </button>
                          <span className="text-2xl px-2">{cartProducts.find(item => item.productId === product._id)?.quantity }</span>
                          <button 
                            className="border text-2xl px-2 text-white w-9 h-9 flex justify-center rounded"
                            onClick={() => {
                              addItemToCart(product._id)
                            }}
                          >
                            +
                          </button>
                        </div>

                        <div>
                          <button className="text-white text-lg px-4 py-1 rounded-md focus:outline-none">
                            <Link 
                              href={'/checkout-address'}
                              className="whitespace-nowrap"
                            >
                              Checkout
                            </Link>
                          </button>
                        </div>
                      </div>
                      
                      <Link 
                        href={'/'}
                        className="text-lg font-bold text-secondary flex gap-2 items-center hover:underline"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>Continue Shopping
                      </Link> 
                    </>
                  ) 
                  : (
                    <div>
                      <button
                        className="text-xl rounded-lg text-white py-2 px-4 w-full"
                        onClick={() => {
                          setAddedToCart(true)
                          addItemToCart(product._id)
                        }}
                      >
                        <div className="flex gap-1">
                          <CartIcon className="w-6 h-6 text-white"/>&nbsp;Add to cart
                        </div>
                      </button>
                    </div>
                  )
                }
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Product