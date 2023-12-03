import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"

const FlashSales = () => {
  const [flashSalesProducts, setFlashSalesProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFlashSalesProducts = async () => {
      const response = await axios('/api/products')
      setFlashSalesProducts(response.data)
      setLoading(false)
    }

    fetchFlashSalesProducts()
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
    <article className="my-10">
      <div className="text-center mb-1">
        <h2 className="text-3xl font-semibold mb-3">Flash Sales</h2>
      </div>

      <div className="flashSalesContainer px-12 py-5">
        {loading 
          ? (
              <p className="loadingMessage text-white">Loading...</p>
            )
          :(
            <Slider {...settings} className="my-8 py-4">
              {flashSalesProducts.length > 0 && flashSalesProducts.map((product) => {
                if (product.productPrice < product.regularPrice) {
                  return (
                    <div key={product._id} className="flex flex-col justify-center items-center h-[350px] rounded-lg border border-gray-200">
                      <div className="p-2">
                        <Link href={`/products/${product._id}`}>
                          <img 
                            src={product.uploadedImagePaths[0]} 
                            alt={product.productName}
                            className="w-48 h-48 cursor-pointer mx-auto p-2"
                          />
                        </Link>
                      </div>
                      <div className="text-center mt-4">
                        <Link href={`/products/${product._id}`}>
                          <p className="text-xl font-semibold text-[#ffffff] hover:text-[#f0f0f0] hover:underline">{product.productName}</p>
                        </Link>
                          <h4 className="text-[#ffffff] text-lg font-semibold">Ksh. {product.productPrice}</h4>
                          <h5 className="text-base italic font-medium line-through text-[#d40d9a]">Ksh. {product.regularPrice}</h5>
                      </div>
                    </div>
                  )
                }
              })}
            </Slider>
          )}
      </div>
    </article>
  )
}

export default FlashSales