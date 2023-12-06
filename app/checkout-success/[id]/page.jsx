'use client'

import Link from "next/link"
import { CartContext } from "../../components/CartContext"
import { useContext, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"

const CheckoutSuccess = () => {
  const { clearCart } = useContext(CartContext)
  const params = useParams()
  const { id } = params

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  const checkPaymentStatus = async () => {
    try {
      const response = await axios.get(`/api/orders/${id}`)
      setOrder(response.data.order)

      if (response.data.order && response.data.order.paymentStatus === "Completed") {
        clearCart();
        setLoading(false);
      } else {
        // If payment status is not complete, check again after a delay
        setTimeout(checkPaymentStatus, 2000) // 2 seconds delay (adjust as needed)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    checkPaymentStatus()
  }, [id])

  return (
    <>
      <div className='min-h-[400px] flex flex-col items-center justify-center'>
        {loading 
          ? (<p>Loading...</p>) 
          : (order && order.paymentStatus === 'Completed'
            ? (
                <>
                  <h2 className="text-4xl font-bold my-2">Payment Successful!</h2>
                  <p className="text-base my-2">Thank you for shopping with Pearls Collections.</p>
                  <p className="text-base my-2">We will send you an email once your orders are dispatched.</p>
                  <div className="mt-3 flex gap-2">
                    <div>
                      <Link 
                          href={"/"}
                          className="flex gap-2 items-center justify-center bg-secondary text-white text-lg px-4 py-2 rounded-md"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                          </svg>
                          Continue Shopping
                        </Link>
                    </div>
                    <div>
                      <Link 
                        href={"/orders"}
                        className="flex gap-2 items-center justify-center bg-[#d40d9a] text-white text-lg px-4 py-2 rounded-md"
                      > 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2c1.591 0 3 .549 4.012 1.461M3 7h2c.97 0 1.915.422 2.568 1.182M3 11h2m9-8v2m0 16v-2m-4-4v2m0 8v-2m1-5.719V21M19 16l3 3m0-6l-3 3m-2.414-3L14 9.414 15.414 8z" />
                        </svg>
                        View Orders
                      </Link>
                    </div>
                  </div>
                </>
              )
              : (
                <div className="text-center">
                  <h3 className="text-4xl font-bold my-2">No payment done yet...</h3>
                  <p className="text-base my-2">Please click the button below to complete your payment or continue shopping</p>
                  <div className="flex gap-2 justify-center">
                    <button className="bg-secondary text-white text-lg py-2 px-4 rounded-md focus:outline-none">
                      <Link 
                        href={"/"}
                        className="flex gap-2 items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                        Continue Shopping
                      </Link>
                    </button>
                    
                    <button className="bg-primary text-white text-lg py-2 px-4 rounded-md focus:outline-none">
                      <Link 
                        href={'/checkout-address'}
                        className="flex gap-2 items-center justify-center"
                      >
                        Checkout
                      </Link>
                    </button>
                  </div>
                </div> 
              )
            )    
        }
      </div>
    </>
  )
}

export default CheckoutSuccess