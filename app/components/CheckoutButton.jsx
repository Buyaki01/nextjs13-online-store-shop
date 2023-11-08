import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useContext } from 'react'
import { CartContext } from './CartContext'

const CheckoutButton = () => {

  const { cartProducts } = useContext(CartContext)

  const { data: session } = useSession()
  const router = useRouter()
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  )

  const handleCheckout = async () => {
    const userExists = session?.user?.name
    if (userExists) {
      const email = session?.user?.email
      const response = await axios.post('/api/checkout-sessions', { email, cartProducts })

      const stripe = await stripePromise
      const result = await stripe?.redirectToCheckout({ sessionId: response.data.sessionId })
    
      if (result.error) {
        console.error(result.error)
      }
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
      Proceed to Checkout
    </button>
  )
}

export default CheckoutButton