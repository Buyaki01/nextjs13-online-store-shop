import axios from "axios"
import { useEffect, useState } from "react"

const ProductsCategories = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/api/products')
      console.log("These is response data", response.data)
      setProducts(response.data)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  console.log(products)

  return (
    <div className="mt-5">
      {loading 
          ? (
              <div className="text-center mt-10">
                <p className="text-xl text-bold">Loading...</p>
              </div>
            ) 
          : (products.length > 0 && products.map(product => (
              <div>
                {product.selectedCategory?.name}
              </div>
            ))
          )}
    </div>
  )
}

export default ProductsCategories