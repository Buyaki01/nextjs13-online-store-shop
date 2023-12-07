'use client'

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

const Featured = () => {
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProduct = async () => {
      const response = await axios.get('/api/products') //Change this to pick categories and display react-slick slider of categories images
      setProducts(response.data)
      setLoading(false)
    }

    fetchFeaturedProduct()
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  return (
    <div className="bg-secondary pt-5 px-12 pb-10 mb-3">
      {loading 
        ? ( <p className="loadingMessage text-white">Loading...</p> ) 
        : products.length > 0 
          ? (
            <div>
              <Slider {...settings}>
                {products.map(product => (
                  <div key={product._id} className="h-[300px]">
                    <Link 
                      href={`/products/${product._id}`}
                      className="flex justify-center"
                    > {/* User should be directed to the categories page */}
                      <div className="flex gap-2"> 
                        <div className="p-2 flex items-center justify-center">
                          <h2 className="text-white font-bold text-2xl">{product.productName}</h2>
                        </div>
                        <div>
                          <img 
                            src={product.uploadedImagePaths[0]}  
                            alt={product.productName} 
                            className="w-[250px] h-[250px]"
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
            ) 
          : ( <p>No featured product available.</p> )
      }
    </div>
  )
}

export default Featured