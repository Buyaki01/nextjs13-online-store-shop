'use client'

import Link from "next/link"
import Header from "../components/Header"
import { CartContext } from "../components/CartContext"
import { useContext, useEffect } from "react"
import { usePathname } from "next/navigation"

const CheckoutSuccess = () => {
  const { clearCart } = useContext(CartContext)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname && pathname.includes("/checkout-success")) {
      clearCart()
    }
  }, [pathname, clearCart])

  return (
    <>
      <Header/>
      <div className='min-h-[400px] flex flex-col items-center justify-center'>
        <h2 className="text-4xl font-bold my-2">Your Payment Accepted by Pearls Collections</h2>
        <p className="text-base my-2">Now you can view your orders or continue shopping with us</p>
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
      </div>
    </>
  )
}

export default CheckoutSuccess