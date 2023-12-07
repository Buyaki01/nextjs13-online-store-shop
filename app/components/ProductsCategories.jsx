import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Link from "next/link"

const ProductsCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('/api/categories')
      setCategories(response.data.categories)
      setLoading(false)
    }
    fetchCategories()
  }, [])

  const filterByCategory = (category) => {
    router.push(`/category?query=${category}`)
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Medium devices (tablets)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Small devices (phones)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="px-12 py-12 shadow-2xl border-t-2">
      {loading 
          ? (
              <div className="text-center mt-8">
                <p className="text-xl text-bold">Loading...</p>
              </div>
            ) 
          : (
            <Slider {...settings} className="productCategories pt-3 pb-8">
              {categories.length > 0 && categories.map((category) => (
                <div
                  key={category._id}
                  className="p-2"
                  onClick={() => filterByCategory(category.name)}
                >
                  <div className="flex justify-center border border-gray-400 rounded-md h-32">
                    <img
                      src={category.categoryImage}
                      alt={category.name}
                      className="w-32 h-32"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                  </div>
                </div>
              ))}
            </Slider>
          )}
    </div>
  )
}

export default ProductsCategories