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
  const [selectedBrands, setSelectedBrands] = useState([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  useEffect(() => {
    const fetchSelectedCategoryResults = async () => {
      const response = await axios.get(`/api/products/category?query=${searchQuery}`)
      setCategoryProducts(response.data.filteredCategoryProducts)
      setLoading(false)
    }
    
    fetchSelectedCategoryResults()
  }, [searchQuery])

  const uniqueBrands = new Set(categoryProducts.map((product) => product.brand.brandName))

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

  const filteredProducts = categoryProducts.filter((product) =>
    selectedBrands.length === 0
      ? true
      : selectedBrands.includes(product.brand.brandName)
  )

  const handleFilterByPrice = (e) => {
    e.preventDefault()
    const filteredByPrice = categoryProducts.filter((product) => {
      const productPrice = parseFloat(product.productPrice)
      return (
        (!minPrice || productPrice >= parseFloat(minPrice)) &&
        (!maxPrice || productPrice <= parseFloat(maxPrice))
      )
    })

    setCategoryProducts(filteredByPrice)
  }

  return (
    <div>
      <Header />
      <div className="my-5">
        {loading 
          ? (
            <p className="text-center text-2xl">Loading...</p>
          ) 
          : (
            categoryProducts.length > 0 
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
              <p className="text-center mt-5 text-xl text-gray-600">
                No available products in the <span className="font-bold text-black">{searchQuery}</span> category
              </p>
            )
          )
        }
      </div>
    </div>
  )
}

export default category