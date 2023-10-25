'use client'

import CartIcon from "@/app/components/CartIcon"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

const Product = () => {
  const params = useParams()
  const { id } = params

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`/api/products/${id}`)
      setProduct(response.data.product)
      setLoading(false)
    }

    fetchProduct()
  }, [id])

  return (
    <div>
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
                        className='flex justify-center'
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="flex flex-col items-center justify-center h-full p-5">
              <h2 className="text-2xl mb-3">{product.productName}</h2>
              <p>{product.description}</p>
              <div>
                <h4 className="font-bold p-3">shs. {product.price}</h4>
                <button
                  className="addToCartButton"
                  onClick={() => {
                    addItemToCart(product._id)
                  }}
                >
                  <div className="flex items-center whitespace-nowrap">
                    <CartIcon/>&nbsp;Add to cart
                  </div>
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Product