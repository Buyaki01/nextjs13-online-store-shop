'use client'

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

const Featured = () => {
  const [categories, setCategories] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchFeaturedProduct = async () => {
      const response = await axios.get('/api/categories')
      setCategories(response.data.categories)
      setLoading(false)
    }

    fetchFeaturedProduct()
  }, [])

  const filterByCategory = (category) => {
    router.push(`/category?query=${category}`)
  }

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
        : categories.length > 0 
          ? (
            <div>
              <Slider {...settings}>
                {categories.map(category => (
                  <div key={category._id} className="h-[300px]">
                    <div 
                      onClick={() => filterByCategory(category.name)}
                      className="flex justify-center"
                    >
                      <div className="flex gap-2"> 
                        <div className="p-2 flex items-center justify-center">
                          <h2 className="text-white font-bold text-2xl">{category.name}</h2>
                        </div>
                        <div>
                          <img 
                            src={category.categoryImage}  
                            alt={category.name} 
                            className="w-[250px] h-[250px]"
                          />
                        </div>
                      </div>
                    </div>
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