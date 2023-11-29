'use client'

import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import Link from "next/link"

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
            <p className="text-center text-2xl">Loading...</p>
          ) 
          : (
            categoryProducts.length > 0 
            ? (
              <div className="grid grid-cols-4 gap-x-6">
                <div className="col-1 border h-fit p-2">
                  <h2 className="font-bold mb-3">Filter</h2>
                  <div>
                    <div>
                      <h3>Brands</h3>
                      {/* Add checkboxes with all the brands */}
                    </div>

                    <div>
                      <h3>Price</h3>
                      {/* Filter by Price */}
                    </div>
                  </div>
                </div>
                <div className="col-span-3 border p-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3">
                    {categoryProducts.map((product) => (
                      <div className="col-1">
                        <Link
                          href={`/products/${product._id}`}
                          className="hover:text-gray-500"
                        >
                          <div>
                            <img
                              src={product.uploadedImagePaths[0]}
                              alt={product.productName}
                              className="w-40 h-40 object-cover cursor-pointer mx-auto"
                            />
                          </div>
                          <div className="text-center">
                            <p>{product.productName}</p>
                            {product.productPrice < product.regularPrice 
                              ? (
                                  <>
                                    <h4>Ksh. {product.productPrice}</h4>
                                    <h6 className="line-through">Ksh. {product.regularPrice}</h6>
                                  </>
                                ) 
                              : (
                                <h4>Ksh. {product.regularPrice}</h4>
                              )
                            }
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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