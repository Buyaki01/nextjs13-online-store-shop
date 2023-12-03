'use client'

import AddressForm from "@/app/checkout-address/page"
import Header from "@/app/components/Header"
import axios from "axios"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const OrderDetailsPage = () => {
  const params = useParams()
  const { id } = params
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/${id}`)
        if (response.data.error) {
          toast.error(response.data.error)
        } else {
          setOrder(response.data.order)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching order:', error)
        toast.error('Error fetching order. Please try again.')
      }
    }

    fetchOrder()
  }, [id])

  const handleEditShippingAddress = () => {
    
  }

  return (
    <div>
      <Header />
      <div className="my-3">
        {loading 
          ? (<p className="text-center text-2xl">Loading...</p>) 
          : (
              <div>
                <h1 className="text-2xl text-primary font-bold mb-2 text-center">Order Details</h1>
                <div className="flex justify-between mb-3">
                  <div>
                    <Link
                      href={'/orders'}
                      className="text-secondary font-semibold flex gap-1 align-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                      Go back
                    </Link>
                  </div>
                  <div>
                    <button 
                      className="bg-primary text-white px-4 py-2 rounded-lg"
                      onClick={handleEditShippingAddress}
                    >
                      <Link 
                        href={'/checkout-address'}
                      >
                        Change Address
                      </Link>
                    </button>
                  </div>
                </div>
                {order && order.products.map((product) => (
                  <div key={product.id} className="flex gap-2 border border-slate-300 p-2 mb-2">
                    <div className="p-3 mr-3 border border-r-2 border-solid border-gray-300 w-40 h-40">
                      <img 
                        src={product.images[0]} 
                        alt={product.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p><span className="text-lg font-medium">Product Name: </span> {product.productName}</p>
                      <p><span className="text-lg font-medium">Description: </span> {product.description}</p>
                      <p><span className="text-lg font-medium">Regular Price: </span> {product.regularPrice}</p>
                      <p><span className="text-lg font-medium">Product Price: </span> {product.productPrice}</p>
                      <p><span className="text-lg font-medium">Category: </span> {product.selectedCategory.name}</p>
                      <p><span className="text-lg font-medium">Brand: </span> {product.brand.brandName}</p>
                    </div>
                  </div>
                ))}
              </div>
          )
        }
      </div>
    </div>
  )
}

export default OrderDetailsPage