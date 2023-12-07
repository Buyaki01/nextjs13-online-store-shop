'use client'

import axios from "axios"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const searchFunctionality = () => {
  const searchParams = useSearchParams()
 
  const searchQuery = searchParams.get('query')

  const [searchedProduct, setSearchedProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [originalResults, setOriginalResults] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchFilteredSearchResults = async () => {
      const response = await axios.get(`/api/products/search?query=${searchQuery}`)
      setOriginalResults(response.data.filteredSearchProducts)
      setSearchedProduct(response.data.filteredSearchProducts)
      setLoading(false)
    }
    
    fetchFilteredSearchResults()
  }, [searchQuery])

  const uniqueBrands = new Set(searchedProduct.map((product) => product.brand.brandName))

  const handleBrandCheckboxChange = (brandName) => {
    // Check if the brand is already selected, then toggle its state
    if (selectedBrands.includes(brandName)) {
      setSelectedBrands((prevSelectedBrands) =>
        // If selected, unselect it (remove from the list)
        prevSelectedBrands.filter((brand) => brand !== brandName)
      )
    } else {
      setSelectedBrands((prevSelectedBrands) => [
        // If not selected, select it (add to the list)
        ...prevSelectedBrands,
        brandName,
      ])
    }
  }

  const filteredProducts = searchedProduct.filter((product) =>
    selectedBrands.length === 0
      ? true
      : selectedBrands.includes(product.brand.brandName)
  )

  const handleFilterByPrice = (e) => {
    e.preventDefault()

    const filteredByPrice = originalResults.filter((product) => {
      const productPrice = parseFloat(product.productPrice)
      return (
        (!minPrice || productPrice >= parseFloat(minPrice)) &&
        (!maxPrice || productPrice <= parseFloat(maxPrice))
      )
    })

    if (filteredByPrice.length === 0) {
      toast.error(`No ${searchQuery} available with the price between ${minPrice} and ${maxPrice}. How about you try another price?`)
      router.push(`/search?query=${searchQuery}`)
    } else {
      setSearchedProduct(filteredByPrice)
    }
  }

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
                <div className="grid grid-cols-4 gap-x-6">
                  <div className="col-1 border h-fit px-2 pb-5 mb-5 border-gray-300">
                    <h2 className="text-3xl font-bold mb-3 pt-2">Filter</h2>
                    <div>
                      <div className="my-5">
                        <h3 className="text-xl mb-2 font-bold">Brands</h3>
                        <div className="mb-2">
                          {[...uniqueBrands].map((brandName) => (
                            <div className="flex gap-2 mb-2 items-center">
                              <div className="items-center">
                                <input
                                  type="checkbox"
                                  id={brandName}
                                  value={brandName}
                                  onChange={() => handleBrandCheckboxChange(brandName)}
                                  className="mb-0"
                                />
                              </div>
                              <label 
                                htmlFor={brandName}
                                className="whitespace-nowrap"
                              >
                                {brandName}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl mb-2 font-bold">Price</h3>
                        <div className="flex gap-1">
                          <div>
                            <label htmlFor="minPrice">Min Price:</label>
                            <input
                              type="number"
                              id="minPrice"
                              value={minPrice}
                              onChange={e => setMinPrice(e.target.value)}
                              className="mb-0"
                              placeholder="Min"
                            />
                          </div>

                          <div>
                            <label htmlFor="maxPrice">Max Price:</label>
                            <input
                              type="number"
                              id="maxPrice"
                              value={maxPrice}
                              onChange={e => setMaxPrice(e.target.value)}
                              className="mb-0"
                              placeholder="Max"
                            />
                          </div>
                          <div className="flex items-end">
                            <button
                              className="text-white px-2"
                              onClick={handleFilterByPrice}
                            >
                              Go
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3 border p-2 border-gray-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3">
                      {filteredProducts.map((product) => (
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
                </div>
              ) 
              : (
                <>
                  <p className="text-center mt-8 text-xl text-gray-600">
                    No available products for <span className="font-bold text-black">{searchQuery}</span>
                  </p>
                  <Link 
                    href={"/"}
                    className="flex gap-1 items-center justify-center mt-3 text-secondary text-xl"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                    Continue Shopping
                  </Link>
                </>
              )
            }
          </>
        )
      }
    </div>
  )
}

export default searchFunctionality