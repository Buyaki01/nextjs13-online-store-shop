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
  }

  return (
    <article className="mb-12">
      <div className="text-center mb-1">
        <h2 className="text-3xl font-semibold">Flash Sales</h2>
      </div>

      <div className="flashSalesContainer px-12 py-5">
        {loading 
          ? (
              <p className="loadingMessage">Loading...</p>
            )
          :(
            <Slider {...settings} className="my-8 py-4">
              {flashSalesProducts.length > 0 && flashSalesProducts.map((product) => (
                <div key={product._id} className="flex flex-col justify-center items-center h-[350px] rounded-lg border border-gray-200">
                  <div className="p-2">
                    <Link href={`/products/${product._id}`}>
                      <img 
                        src={product.uploadedImagePaths[0]} 
                        alt={product.productName}
                        className="w-48 h-48 object-cover cursor-pointer mx-auto p-2"
                      />
                    </Link>
                  </div>
                  <div className="text-center mt-4">
                    <Link href={`/products/${product._id}`}>
                      <p className="text-xl font-semibold hover:underline">{product.productName}</p>
                    </Link>
                    <h4 className="text-lg font-semibold">Ksh. {product.price}</h4>
                  </div>
                </div>
              ))}
            </Slider>
          )}
      </div>
    </article>
  )
}

export default FlashSales