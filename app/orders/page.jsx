'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import { format, isToday, isYesterday } from 'date-fns'

const Orders = () => {
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

  const customDateFormat = (date) => {
    if (isToday(date)) {
      return `Today ${format(date, 'h:mm a')}`;
    } else if (isYesterday(date)) {
      return `Yesterday ${format(date, 'h:mm a')}`;
    } else {
      return format(date, 'MM/dd/yyyy hh:mm a');
    }
  }

  return (
    <>
      <div className="my-5">
        <h2 className="uppercase mb-3 text-center text-2xl font-bold text-primary">Orders</h2>
        {loading 
          ? (<div className="text-center mt-10">
              <p className="text-xl text-bold">Loading...</p>
          </div>) 
          : (orders.length > 0 
            ? (
                <div className="flex justify-center">
                  <div className="p-2 mb-5">
                    {orders.map(order => (
                      <div className="my-2" key={order._id}>
                        <div className="flex items-center gap-x-8 border border-gray-400 py-3 px-5 rounded-lg">
                          <div className="justify-center border-r pr-2">
                            <button className={`w-[80px] py-1 px-2 whitespace-nowrap 
                              ${order.paymentStatus === "Completed" 
                                ? "bg-secondary" 
                                : "bg-red-500"
                              } text-white rounded-md`}
                            >
                              {order.paymentStatus === "Completed" ? "Paid" : "Not Paid"}
                            </button>
                          </div>

                          <div className="justify-center border-r pr-2 flex">
                            <time className="font-semibold whitespace-nowrap">
                              {customDateFormat(new Date(order.createdAt))}
                            </time>
                          </div>

                          <div className="font-bold flex border-r pr-2">
                            <h3 className="justify-center whitespace-nowrap p-1">Ksh. {order.totalPrice}</h3>
                          </div>
                        
                          <div className="justify-center">
                            <button>
                              <Link className="bg-primary text-white py-1 px-2 rounded-md cursor-pointer whitespace-nowrap" href={`/orders/${order._id}`}>
                                Show order
                              </Link>
                            </button>
                          </div>
                        </div>
                    </div>
                  ))}
                  </div>
                </div>
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

export default Orders