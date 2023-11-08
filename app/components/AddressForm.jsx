import { useState } from "react"

const AddressForm = () => {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalAddress, setPostalAddress] = useState("")
  const [country, setCountry] = useState("")

  return (
    <form>
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

    </form>
  )
}

export default AddressForm