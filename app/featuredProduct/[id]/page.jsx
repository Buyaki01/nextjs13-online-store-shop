'use client'

import CartIcon from "@/app/components/CartIcon"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState, useContext } from "react"
import styled from "styled-components"
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { CartContext } from "@/app/components/CartContext"
import Link from "next/link"

const Wrapper = styled.div`
  margin: 50px 0px;

  h4{
    color: #d40d9a;
  }
`;

const FeaturedProduct = () => {
  const [featuredProductInfo, setFeaturedProductInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [addedToCart, setAddedToCart] = useState(false)

  const { cartProducts, addItemToCart, decrementItemInCart } = useContext(CartContext)

  const params = useParams()
  const { id } = params

  useEffect(() => {
    const fetchFeaturedProduct = async () => {
      try {
        const response = await axios.get(`/api/featuredProduct/${id}`)
        setFeaturedProductInfo(response.data.featuredProduct)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching product:", error)
      }
    }

    fetchFeaturedProduct()
  }, [id])

  useEffect(() => {
    const isProductInCart = cartProducts.some((item) => item.productId === id)
    setAddedToCart(isProductInCart)

  }, [cartProducts, id])

  return (
    <Wrapper>
      {loading 
        ? (
            <h1 className="mt-3 text-xl text-center">Loading...</h1>
          ) 
        : (
          <div className="grid grid-cols-2 gap-4 p-5">
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
                {featuredProductInfo.uploadedImagePaths.length > 0 && featuredProductInfo.uploadedImagePaths.map((imagePath, index) => (
                  <SwiperSlide key={index}>
                    <div className='flex h-full w-full items-center justify-center'>
                      <img
                        src={imagePath}
                        alt={featuredProductInfo.productName}
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
                {featuredProductInfo.uploadedImagePaths.length > 0 && featuredProductInfo.uploadedImagePaths.map((imagePath, index) => (
                  <SwiperSlide key={index}>
                    <div className='flex h-full w-full items-center justify-center'>
                      <img
                        src={imagePath}
                        alt={featuredProductInfo.productName}
                        className='flex justify-center'
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="flex flex-col items-center justify-center h-full p-5">
              <h2 className="text-3xl mb-4 font-semibold">{featuredProductInfo.productName}</h2>
              <p className="text-base text-gray-600 mb-5">{featuredProductInfo.description}</p>
              
              {addedToCart ? (
                <>
                  <div className="flex items-center justify-center space-x-4 mb-5">
                    <div><h4 className="text-2xl font-bold">Ksh.{featuredProductInfo.price}</h4></div>
                    <button 
                      className="border text-2xl px-2 text-white w-9 h-9 flex justify-center rounded"
                      onClick={() => {
                        decrementItemInCart(featuredProductInfo._id)
                      }}
                    >-
                    </button>
                    <span className="text-2xl">{cartProducts.find(item => item.productId === featuredProductInfo._id)?.quantity }</span>
                    <button 
                      className="border text-2xl px-2 text-white w-9 h-9 flex justify-center rounded"
                      onClick={() => {
                        addItemToCart(featuredProductInfo._id)
                      }}
                    >+
                    </button>
                  </div>

                  <button className="text-xl text-white py-1 w-60 rounded-lg mb-4">
                    Proceed to Checkout
                  </button>

                  <Link 
                    href={'/'}
                    className="text-lg font-semibold text-green-600 flex gap-2 items-center hover:underline hover:text-green-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                    Continue Shopping
                  </Link>
                </>
              ) : (
                <>
                  <div className="mb-6"><h4 className="text-2xl font-bold">shs. {featuredProductInfo.price}</h4></div>
                  <button
                    className="text-xl rounded-lg text-white w-60 py-1"
                    onClick={() => {
                      setAddedToCart(true)
                      addItemToCart(featuredProductInfo._id)
                    }}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <CartIcon className="w-6 h-6 text-white"/>&nbsp;Add to cart
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        )
      }
    </Wrapper>
  )
}

export default FeaturedProduct