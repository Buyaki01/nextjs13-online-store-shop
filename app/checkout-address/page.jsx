'use client'

import { useState } from "react"
import CheckoutButton from "../components/CheckoutButton"

const AddressForm = () => {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalAddress, setPostalAddress] = useState("")
  const [country, setCountry] = useState("")

  return (
    <form className="min-h-fit h-full flex justify-center">
      <div  className="max-w-[600px] w-full flex flex-col gap-6 items-center shadow-xl shadow-slate-400 rounded-md my-8 p-4 md:p-8">
        <h2 className="text-4xl font-semibold mb-2">Checkout Address</h2>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={firstname}
          onChange={e => setFirstname(e.target.value)}
        />

        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={lastname}
          onChange={e => setLastname(e.target.value)}
        />

        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />

        <input
          type="text"
          name="streetAddress"
          placeholder="Street Address"
          value={streetAddress}
          onChange={e => setStreetAddress(e.target.value)}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={city}
          onChange={e => setCity(e.target.value)}
        />

        <input
          type="text"
          name="postalAddress"
          placeholder="Postal Address"
          value={postalAddress}
          onChange={e => setPostalAddress(e.target.value)}
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={country}
          onChange={e => setCountry(e.target.value)}
        />

        <div className="mt-[-25px]">
          <CheckoutButton />
        </div>
      </div>
    </form>
  )
}

export default AddressForm