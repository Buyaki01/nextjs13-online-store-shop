'use client'

import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const CheckoutButton = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  )

  const handleCheckout = async () => {
    const userExists = session?.user?.name
    if (userExists) {
      const email = session?.user?.email
      await axios.post('/api/checkout-sessions', { email })
      //await stripePromise?.redirectToCheckout({ sessionId: response.data._id })
    }
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