'use client'

import { useEffect, useState } from "react"
import Header from "../components/Header"
import axios from "axios"
import Link from "next/link"

const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('/api/orders')
      setOrders(response.data.orders)
      setLoading(false)
    }

    fetchOrders()
  }, [])

  return (
    <>
      <Header />
      <div className="mt-3">
        <h2 className="uppercase mb-3 text-center text-2xl font-bold text-primary">Orders</h2>
        {loading 
          ? (<div className="text-center mt-10">
              <p className="text-xl text-bold">Loading...</p>
          </div>) 
          : (orders.length > 0 
            ? (
                orders.map(order => (
                  <div className="mb-5 flex justify-center" key={order._id}>
                    <div className="flex items-center gap-x-3 border border-gray-400 py-3 px-5 rounded-lg">
                      
                      <div>
                        {order.paymentStatus === "completed" ? (<button className="bg-[#50d71e] text-white py-1 px-2">Paid</button>) : (<button className="bg-red-500 text-white py-1 px-2">Not Paid</button>)}
                      </div>
                      
                      <div>{order._id}</div>

                      <div>{(new Date(order.createdAt)).toLocaleString()}</div>

                      <div>{order.totalPrice}</div>
                     
                      <div>
                        <Link className="bg-primary text-white py-1 px-2 rounded-md cursor-pointer" href={`/orders/${order._id}`}>
                          Show order
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
            )
            : (
                <div className="flex justify-center mt-10">
                  <p className="text-xl font-semibold mb-4"> No Orders Yet</p>
                  <Link 
                    href={'/'}
                    className="text-xl font-bold text-secondary flex gap-1 items-center justify-center hover:underline"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>Start Shopping
                  </Link>
                </div>
              )
          )}
      </div>
    </>
  )
}

export default MyOrders