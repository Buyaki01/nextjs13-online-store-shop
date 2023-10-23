'use client'

import CartIcon from "@/app/components/CartIcon"
import axios from "axios"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import styled from "styled-components"
import AddToCartBtn from "@/app/components/AddToCartBtn"
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import Image from "next/image"

const Wrapper = styled.div`
  margin: 50px 0px;

  img{
    max-width: 100%;
    max-height: 350px;
  }
  
  h4{
    color: #d40d9a;
  }
`;

const PriceAddToCartButtonDiv = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const NavLinks = styled(Link)`
  text-decoration: none;
  font-size: 1.0rem;
  color: black;
  white-space: nowrap;
`;

const FeaturedProduct = () => {
  const [featuredProductInfo, setFeaturedProductInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

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
                {/* {featuredProductInfo.uploadedImagePaths.length > 0 && featuredProductInfo.uploadedImagePaths.map((imagePath, index) => ( */}
                  <SwiperSlide>
                    <div className='flex h-full w-full items-center justify-center'>
                      <img
                        src="http://localhost:3000/images/featuredProductHandbag.png"
                        alt="featured product"
                        width={300}
                        height={200}
                        className='flex justify-center'
                      />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                  <img src="http://localhost:3000/images/featuredDuffleBag.png" width={300} height={200} className='flex justify-center'/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src="http://localhost:3000/images/featuredDuffleLeatherBag.png" width={300} height={200}/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src="http://localhost:3000/images/featuredDuffleLuisBag.png" width={300} height={200}/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src="http://localhost:3000/images/featuredRedSupremeBag.png" width={300} height={200}/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src="http://localhost:3000/images/featuredDruffleVuitonBag.png" width={300} height={200}/>
                </SwiperSlide>
                {/* ))} */}
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
                <SwiperSlide>
                  <img src="http://localhost:3000/images/featuredProductHandbag.png" width={300} height={200}/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src="http://localhost:3000/images/featuredDuffleBag.png" width={300} height={200}/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src="http://localhost:3000/images/featuredDuffleLeatherBag.png" width={300} height={200}/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src="http://localhost:3000/images/featuredDuffleLuisBag.png" width={300} height={200}/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src="http://localhost:3000/images/featuredRedSupremeBag.png" width={300} height={200}/>
                </SwiperSlide>
                <SwiperSlide>
                  <img src="http://localhost:3000/images/featuredDruffleVuitonBag.png" width={300} height={200}/>
                </SwiperSlide>
              </Swiper>

              {/* {featuredProductInfo.uploadedImagePaths.length > 0 && (
                <img
                  src={`${featuredProductInfo.uploadedImagePaths[0]}`}
                  alt={featuredProductInfo.productName}
                />
              )} */}
            </div>

            <div className="flex flex-col items-center justify-center h-full p-5">
              <h2 className="text-2xl mb-3">{featuredProductInfo.productName}</h2>
              <p>{featuredProductInfo.description}</p>
              <PriceAddToCartButtonDiv>
                <h4 className="font-bold p-3">shs. {featuredProductInfo.price}</h4>
                <AddToCartBtn>
                  <NavLinks href={'/cart'}>
                    <div className="flex items-center whitespace-nowrap">
                      <CartIcon/>&nbsp;Add to cart
                    </div>
                  </NavLinks>
                </AddToCartBtn>
              </PriceAddToCartButtonDiv>
            </div>
          </div>
        )
      }
    </Wrapper>
  )
}

export default FeaturedProduct