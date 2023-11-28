'use client'

import AddressForm from "@/app/checkout-address/page"
import Header from "@/app/components/Header"
import axios from "axios"
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

  console.log('Order:', order)

  return (
    <div>
      <Header />
      <div className="my-3">
        {loading 
          ? (<p className="text-center text-2xl">Loading...</p>) 
          : (
            <div className="grid grid-cols-5 gap-x-4">
              <div className="col-span-3">
                <h1 className="text-2xl text-primary font-bold mb-2 text-center">Order Details</h1>
                {order && order.products.map((product) => (
                  <div key={product.id} className="flex gap-2 border border-slate-300 p-2 mb-2">
                    <div>
                      <img 
                        src={product.images[0]} 
                        alt={product.productName} 
                        className="w-40 h-40"
                      />
                    </div>
                    <div>
                      <p>Product Name: {product.productName}</p>
                      <p>Description: {product.description}</p>
                      <p>Regular Price: {product.regularPrice}</p>
                      <p>Product Price: {product.productPrice}</p>
                      <p>Category: {product.selectedCategory.name}</p>
                      <p>Brand: {product.brand.brandName}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-span-2">
                <h2 className="text-2xl text-primary font-bold mb-2 text-center">Checkout Address</h2>
                <div>
                  {order && (
                    <>
                      <AddressForm
                        firstname={order.firstname}
                        lastname={order.lastname}
                        phoneNumber={order.phoneNumber}
                        streetAddress={order.streetAddress}
                        city={order.city}
                        postalCode={order.postalCode}
                        country={order.country}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default OrderDetailsPage