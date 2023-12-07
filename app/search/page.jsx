'use client'

import axios from "axios"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const searchFunctionality = () => {
  const searchParams = useSearchParams()
 
  const searchQuery = searchParams.get('query')

  const [searchedProduct, setSearchedProduct] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFilteredSearchResults = async () => {
      const response = await axios.get(`/api/products/search?query=${searchQuery}`)
      setSearchedProduct(response.data.filteredSearchProducts)
      setLoading(false)
    }
    
    fetchFilteredSearchResults()
  }, [searchQuery])

  return (
    <div className="my-5">
      {loading 
        ? (
            <p className="text-center text-2xl mt-5">Loading...</p>
          ) 
        : (
          <>
            { searchedProduct.length > 0 
              ? (
                <div className="col-span-3 border p-2 border-gray-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3">
                    {searchedProduct.map((product) => (
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
                                    <h6 className="line-through text-gray-500">Ksh. {product.regularPrice}</h6>
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
              ) 
              : (
                <p className="text-center mt-8 text-xl text-gray-600">
                  No available products in the <span className="font-bold text-black">{searchQuery}</span> category
                </p>
              )
            }
          </>
        )
      }
    </div>
  )
}

export default searchFunctionality