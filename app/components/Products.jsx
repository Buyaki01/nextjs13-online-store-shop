'use client'

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios('/api/products')
      setProducts(response.data)
      setLoading(false)
    }

    fetchProducts()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center">
      {loading 
        ? (
            <p className="loadingMessage">Loading...</p>
          )
        : (products.length > 0 && products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg text-center">
              <div>
                <Link href={`/products/${product._id}`}>
                  <img 
                    src={product.uploadedImagePaths[0]} 
                    alt={product.productName}
                    className="w-40 h-40 object-cover cursor-pointer mx-auto"
                  />
                </Link>
              </div>
    
              <div className="mt-4">
                <Link href={`/products/${product._id}`}>
                  <p className="text-lg font-semibold hover:underline cursor-pointer">{product.productName}</p>
                </Link>
                <h4 className="text-xl font-bold mt-2 text-center">Ksh. {product.productPrice}</h4>
              </div>
            </div>
          ))
        )
      }
    </div>
  )
}

export default Products