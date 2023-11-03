'use client'

import { loadStripe } from '@stripe/stripe-js'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const CheckoutButton = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  )

  const handleCheckout = () => {
    if (session?.user?.name)
      console.log("Hello")
    else{
      router.push('/login')
    }
  }

  return (
    <button 
      className="text-white text-lg py-2 px-4 rounded-md focus:outline-none"
      onClick={handleCheckout}
    >
      Checkout
    </button>
  )
}

export default CheckoutButton