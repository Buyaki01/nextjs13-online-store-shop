'use client'

import styled from "styled-components"
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

  return (
    <div>
      {loading 
        ? ( <p>Loading...</p> ) 
        : products.length > 0 
          ? (
              <>
                {products.map(product => (
                  <img src={product.uploadedImagePaths[0]}  alt={product.productName} />
                ))}
              </>
            ) 
          : ( <p>No featured product available.</p> )
      }
    </div>
  )
}

export default Featured