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
        <h2 className="uppercase mb-3 text-center text-xl font-bold">Orders</h2>
        {loading 
          ? (<p className="text-xl text-bold text-center">Loading...</p>) 
          : (orders.length > 0 
            ? (
              <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAYMENT STATUS</th>
                      <th>DELIVERY STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
              </table>
            )
            : (
                <div className="flex justify-center hover:underline bg-red-800">
                  <p className="text-xl font-semibold"> No Orders Yet</p>
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