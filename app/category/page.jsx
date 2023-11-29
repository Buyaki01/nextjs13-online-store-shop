'use client'

import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Header from "../components/Header"

const category = () => {
  
  const searchParams = useSearchParams()
 
  const searchQuery = searchParams.get('query')
  
  const [categoryProducts, setCategoryProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSelectedCategoryResults = async () => {
      const response = await axios.get(`/api/products/category?query=${searchQuery}`)
      setCategoryProducts(response.data.filteredCategoryProducts)
      setLoading(false)
    }
    
    fetchSelectedCategoryResults()
  }, [searchQuery])

  return (
    <div>
      <Header />
      <div className="my-3">
        {loading 
          ? (
            <p>Loading...</p>
          ) 
          : (
            categoryProducts.length > 0 
            ? (
              categoryProducts.map((product) => (
                <p>{product.productName}</p>
              ))
            ) 
            : (
              <p>No products matching <span className="font-bold">{searchQuery}</span> category</p>
            )
          )
        }
      </div>
    </div>
  )
}

export default category