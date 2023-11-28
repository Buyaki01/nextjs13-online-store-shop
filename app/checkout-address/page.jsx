'use client'

import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useContext, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { CartContext } from "../components/CartContext"
import toast from "react-hot-toast"

const AddressForm = ({ firstname: editFirstname, lastname: editLastname, phoneNumber: editPhoneNumber, streetAddress: editStreetAddress, city: editCity, postalCode: editPostalCode, country: editCountry }) => {
  const [firstname, setFirstname] = useState(editFirstname || "")
  const [lastname, setLastname] = useState(editLastname || "")
  const [phoneNumber, setPhoneNumber] = useState(editPhoneNumber || "")
  const [streetAddress, setStreetAddress] = useState(editStreetAddress || "")
  const [city, setCity] = useState(editCity || "")
  const [postalCode, setPostalCode] = useState(editPostalCode || "")
  const [country, setCountry] = useState(editCountry || "")

  const pathname = usePathname()

  const { cartProducts } = useContext(CartContext)

  const { data: session } = useSession()
  const router = useRouter()

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  )

  const handleCheckout = async (e) => {
    e.preventDefault()
    const userExists = session?.user?.name
    if (userExists) {
      const email = session?.user?.email
      
      try {
        const response = await axios.post('/api/checkout-sessions', { 
          email, 
          cartProducts,
          firstname,
          lastname,
          phoneNumber,
          streetAddress,
          city,
          postalCode,
          country,
        })
  
        const stripe = await stripePromise
        const sessionIdData = await response.data.sessionId
        const result = await stripe?.redirectToCheckout({ sessionId: sessionIdData })
    
        if (result.error) {
          console.error(result.error)
  
          if (result.error.message.includes('Request aborted due to timeout being reached')) {
            toast.error('Request timed out. Please refresh the page and try again.')
          }
        }
      } catch (error) {
        console.error('An error occurred during checkout:', error)
        toast.error('An error occurred during checkout. Please try again.')
      }
    }
    else{
      router.push('/login')
    }
  }

  return (
    <form className="min-h-fit h-full flex justify-center">
      <div  className="max-w-[600px] w-full flex flex-col gap-6 items-center shadow-xl shadow-slate-400 rounded-md my-8 p-4 md:p-8">
        <h2 className="text-4xl font-semibold mb-2">Shipping Address</h2>
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={e => setFirstname(e.target.value)}
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={e => setLastname(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />

        <input
          type="text"
          placeholder="Street Address"
          value={streetAddress}
          onChange={e => setStreetAddress(e.target.value)}
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={e => setCity(e.target.value)}
        />

        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={e => setPostalCode(e.target.value)}
        />

        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={e => setCountry(e.target.value)}
        />

        <div className="mt-[-25px]">
          {pathname.includes("/checkout-address") 
            ? (
              <button
                onClick={handleCheckout}
                className="text-white text-lg py-2 px-4 rounded-md focus:outline-none"
              >
                Proceed to Checkout
              </button>
            ) 
            : (
              <button
                // onClick={handleEditAddress}
                className="text-white text-lg py-2 px-4 rounded-md focus:outline-none"
              >
                Update Address
              </button>
            )}
          
        </div>
      </div>
    </form>
  )
}

export default AddressForm