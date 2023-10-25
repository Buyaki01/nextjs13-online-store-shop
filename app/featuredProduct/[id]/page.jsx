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

  const { addItemToCart } = useContext(CartContext)

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

  return (
    <Wrapper>
      {loading 
        ? (
            <h1 className="mt-3 text-xl text-center">Loading...</h1>
          ) 
        : (
          <div className="grid grid-cols-2 gap-4 p-5">
            <div className="border-solid border border-gray-200 rounded-sm">
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
              <h2 className="text-2xl mb-3">{featuredProductInfo.productName}</h2>
              <p>{featuredProductInfo.description}</p>

              <div className="priceAddToCartButton">
                <h4 className="font-bold p-3">Ksh. {featuredProductInfo.price}</h4>
                {addedToCart ? (
                  // If addedToCart is true, display the new div
                  <div className="mr-3 flex items-center justify-center">
                    <button className="border border-none text-xl text-white">-</button>
                    <span className="text-xl mx-2">1</span>
                    <button className="border border-none text-xl text-white">+</button>
                  </div>
                ) : (
                  <button
                    className="addToCartButton"
                    onClick={() => {
                      setAddedToCart(true)
                      addItemToCart(featuredProductInfo._id)
                    }}
                  >
                    <div className="flex items-center whitespace-nowrap">
                      <CartIcon/>&nbsp;Add to cart
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      }
    </Wrapper>
  )
}

export default FeaturedProduct